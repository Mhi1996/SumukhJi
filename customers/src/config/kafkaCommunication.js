const { Kafka } = require("kafkajs");

//creating the kafka customer producer
const kafka = new Kafka({
  clientId: "costomer-module",
  brokers: ["localhost:8002"],
});

// const producer = kafka.producer();
// const produceProductEvent = async (customerData) => {
//   await producer.connect();
//   await producer.send({
//     topic: "customer-events",
//     messages: [{ value: JSON.stringify(customerData) }],
//   });
//   await producer.disconnect();
// };

//creating kafka customer consumer
const consumer = kafka.consumer({ groupId: "customer-module" });

// const consumeProductEvent = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: "product-events", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       const consumerData = JSON.parse(message.value.toString());
//       // Process productData
//     },
//   });
// };
// consumeProductEvent().catch(console.error);

async function processMessage(message) {
  console.log(`recevied message======= ` + message.value.toString);
}



async function connectConsumer(){
  await consumer.connect();
  await consumer.subscribe({topic:productToCustomerTopic});
  await consumer.run({
    eachMessage:async({message})=>{
      await processMessage(message)
    }
  })
}
module.exports = { connectConsumer };
