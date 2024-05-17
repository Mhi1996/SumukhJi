const { Kafka } = require("kafkajs");

//creating the kafka product producer
const kafka = new Kafka({
  clientId: "product-module",
  brokers: ["localhost:8003"],
  productToCustomerTopic:'product-to-customer',
});

const producer = kafka.producer();

async function sendMessage(message){
  await producer.send({
    topic:productToCustomerTopic,
    message:[{value:message}]
  })
}
async function connectProducer(){
  await producer.connect()
}

// const produceProductEvent = async (addProduct) => {
//   await producer.connect();
//   await producer.send({
//     topic: "product-events",
//     messages: [{ value: JSON.stringify(addProduct) }],
//   });
//   await producer.disconnect();
// };



// //creating kafka product consumer
// const consumer = kafka.consumer({ groupId: "customer-module" });

// const consumeProductEvent = async () => {
//   await consumer.connect();
//   await consumer.subscribe({ topic: "customer-events", fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       const consumerData = JSON.parse(message.value.toString());
//       // Process productData
//     },
//   });
// };
// consumeProductEvent().catch(console.error);
module.exports = {  sendMessage,connectProducer };
