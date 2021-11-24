import { ServiceBusClient } from "@azure/service-bus";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function messages(req, res) {
  const { body, method } = req;
  const { queueName, messages } = body;

  switch (method) {
    case "POST":
      try {
        await sendAzureServiceBusMessage(queueName, messages);
        res.status(200).send({
          success: true,
          message: "Message sent to queue",
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
