/**
 * Please refer git repo https://github.com/Blizzard/node-rdkafka
 * this is consumer for kafka
 */
const Kafka = require("node-rdkafka");
//basic connection configuration for consumer
let kafka_brokers_sasl = [
  "broker-1-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-0-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-5-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-4-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-3-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-2-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093"
]
const consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka-testTopic",
    //"metadata.broker.list": "broker-0-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093", 
    "metadata.broker.list": kafka_brokers_sasl,
    "api.version.request": true,
    //"dr_cb": true, 
    "sasl.username":"token",
    "sasl.password":"WtRY5yueJ98sdxUNLzzS-0tBDdOinGziJ9BmM9dgV7d5",
    "security.protocol":"SASL_SSL",
    "sasl.mechanism":"PLAIN",  
    "broker.version.fallback": "0.10.0"
  },
  {}
);

consumer
  .on("ready", function () {
    // Subscribe to the  topic named testTopic
    // This makes subsequent consumes read from that topic.
    consumer.subscribe(["sales"]);

    // Read one message every 1000 milliseconds

    setInterval(function () {
      consumer.consume(3);
    }, 1000);
  })
  .on("data", function (data) {
    // you will start receiving message here once the producer successfully produces the message here
    console.log("Consumer message will be seen below:");
    console.log(data, "Consumed message");

    const intoString = data.value.toString();
    const jsonData = JSON.parse(intoString);
    console.log(jsonData, "Message in json");
  })
  .on("error", function (err) {
    console.log("err", err);
  });

// initiate the consumer connection
consumer.connect(null, function () {
  console.log("Consumer connected");
});

module.exports = consumer;
