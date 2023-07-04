const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092'],
});

(async () => {
  const admin = kafka.admin();
  const consumer = kafka.consumer({ groupId: 'test-group' });
  const producer = kafka.producer();

  await admin.createTopics({
    topics: [
      {
        topic: 'my-test-topic',
        numPartitions: 1,
        replicationFactor: 1,
      },
    ],
  });

  await consumer.connect();
  await producer.connect();

  await consumer.subscribe({ topic: 'my-test-topic' });

  await consumer.run({
    eachMessage: ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });

  let i = 0;

  setInterval(() => {
    producer.send({
      topic: 'my-test-topic',
      messages: [
        {
          value: String(i++),
        },
      ],
    });
  }, 1000);
})();
