import { ServiceBusClient } from "@azure/service-bus";

export default async function messages(req, res) {
  const { method } = req;
  const { queueName, action } = req.query;

  switch (method) {
    case "GET":
      if (action === "listen") {
        try {
          const messages = await listenAzureServiceBusMessage(queueName);
          res.status(200).send({
            success: true,
            data: messages,
            messages: "Messages received",
          });
        } catch (err) {
          res.status(500).send({
            success: false,
            error: err.message,
          });
        }
      } else if (action === "peek") {
        try {
          const messages = await peekAzureServiceBusMessage(queueName);
          console.log(messages, "GAAAAAA");
          res.encoding = "utf8";
          res.status(200).send({
            success: true,
            data: messages,
            messages: "Messages peeked",
          });
        } catch (err) {
          res.status(500).send({
            success: false,
            error: err.message,
          });
        }
      }
      break;
    default:
      res.status(405).json({
        message: "Method not allowed",
      });
  }
}

async function listenAzureServiceBusMessage(queueName) {
  const sbClient = new ServiceBusClient(
    process.env.NEXT_PUBLIC_AZURE_CONNECTION_STRING
  );
  const queueReceiver = sbClient.createReceiver(queueName);

  try {
    let allMessages = [];
    console.log(`Receiving 10 messages...`);

    while (allMessages.length < 10) {
      const messages = await queueReceiver.receiveMessages(10, {
        maxWaitTimeInMs: 5 * 1000,
      });

      if (!messages.length) {
        console.log("No more messages to receive");
        break;
      }

      console.log(`Received ${messages.length} messages`);
      allMessages.push(...messages);
      console.log(allMessages, "all messages");

      for (let message of messages) {
        console.log(`  Message: '${message.body}'`);

        await queueReceiver.completeMessage(message);
      }
    }
    await queueReceiver.close();
    return allMessages.map((message) => message.body);
  } finally {
    await sbClient.close();
  }
}

async function peekAzureServiceBusMessage(queueName) {
  const sbClient = new ServiceBusClient(
    process.env.NEXT_PUBLIC_AZURE_CONNECTION_STRING
  );

  // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
  const queueReceiver = sbClient.createReceiver(queueName);

  try {
    // peeking messages does not lock or remove messages from a queue or subscription.
    // For locking and/or removal, look at the `receiveMessagesLoop` or `receiveMessagesStreaming` samples,
    // which cover using a receiver with a `receiveMode`.
    console.log(`Attempting to peek 10 messages at a time`);
    const peekedMessages = await queueReceiver.peekMessages(10);

    console.log(`Got ${peekedMessages.length} messages.`);

    for (let i = 0; i < peekedMessages.length; ++i) {
      console.log(`Peeked message #${i}: ${peekedMessages[i].body}`);
    }

    await queueReceiver.close();
    return peekedMessages.map((message) => message.body);
  } finally {
    await sbClient.close();
  }
}
