/**
 * Please refer git repo https://github.com/Blizzard/node-rdkafka
 * this is producer for kafka
 */
const Kafka = require("node-rdkafka");

let kafka_brokers_sasl = [
  "broker-1-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-0-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-5-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-4-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-3-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093",
  "broker-2-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093"
]
//basic connection configuration for producer
const producer = Kafka.Producer({
  "dr_cb": true,
  //"metadata.broker.list": "broker-0-1gjrqrlglw3sdz07.kafka.svc08.us-south.eventstreams.cloud.ibm.com:9093", 
  "metadata.broker.list": kafka_brokers_sasl,
  "api.version.request": true, 
  "sasl.username":"token",
  "sasl.password":"WtRY5yueJ98sdxUNLzzS-0tBDdOinGziJ9BmM9dgV7d5",
  "security.protocol":"SASL_SSL",
  "sasl.mechanism":"PLAIN",  
  "broker.version.fallback": "0.10.0"
});
producer.on("ready", function () {
  console.log("producer ready");
});

producer.on("event.error", function (err) {
  console.log("Error from producer");
  console.log(err);
});
producer.connect(null, (err, metadata) => {
  console.log("Producer Connected");
});
function producerMessage(data) {
  return new Promise(async (resolve, reject) => {
    let producemessage = Buffer.from(JSON.stringify(data));

    // message specified in Buffer section below will be created on topic testTopic
    // make sure you create the topic before producing the message if autocreate topic is disabled.
    try {
      await producer.produce(
        "sales",
        null,
        producemessage,
        null,
        Date.now()
      );
      resolve(producemessage);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = producerMessage;
