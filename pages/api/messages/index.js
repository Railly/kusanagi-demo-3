import { ServiceBusClient } from "@azure/service-bus";

export default async function messages(req, res) {
  const { body, method } = req;
  const { queueName, messages } = body;

  switch (method) {
    case "POST":
      try {
        await sendAzureServiceBusMessage(queueName, messages);
        res.status(200).send({
          success: true,
          message: `${messages.length} messages sent to queue ${queueName}`,
        });
      } catch (err) {
        res.status(500).send({
          success: false,
          error: err.message,
        });
      }
      break;
    default:
      res.status(405).json({
        message: "Method not allowed",
      });
  }
}

async function sendAzureServiceBusMessage(queueName, messages) {
  console.log(queueName, messages);
  const sbClient = new ServiceBusClient(
    process.env.NEXT_PUBLIC_AZURE_CONNECTION_STRING
  );
  const sender = sbClient.createSender(queueName);

  try {
    let batch = await sender.createMessageBatch();
    for (let i = 0; i < messages.length; i++) {
      if (!batch.tryAddMessage(messages[i])) {
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();
        if (!batch.tryAddMessage(messages[i])) {
          throw new Error("Message too big to fit in a batch");
        }
      }
    }

    await sender.sendMessages(batch);

    await sender.close();
  } finally {
    await sbClient.close();
  }
}

async function receiveAzureServiceBusMessage(queueName) {
  const sbClient = new ServiceBusClient(
    process.env.NEXT_PUBLIC_AZURE_CONNECTION_STRING
  );
  const queueReceiver = sbClient.createReceiver(queueName);

  try {
    let allMessages = [];

    console.log(`Receiving 10 messages...`);

    while (allMessages.length < 10) {
      const messages = await queueReceiver.receiveMessages(10, {
        maxWaitTimeInMs: 60 * 1000,
      });

      if (!messages.length) {
        console.log("No more messages to receive");
        break;
      }

      console.log(`Received ${messages.length} messages`);
      allMessages.push(...messages);

      for (let message of messages) {
        console.log(`  Message: '${message.body}'`);

        await queueReceiver.completeMessage(message);
      }
    }

    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
  return allMessages;
}
