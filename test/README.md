# Overview

The purpose of this repository is to produce message from Rest API and consume the same message to further process it using node-rdkafka module in Node.js

**After you clone the below repositories please follow the below steps**

- Step 1: Change your broker details and topic details in kafka-producer.js and kafka-consumer.js
- Step 2: Run the command below to install the dependencies

```
$ npm i
```

- Step 3: Run the command below to start the application:

```
$ npm start
```

- Step 4:Now shoot the below curl command as many times you want to produce the message :

```
curl --location --request POST 'localhost:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{
"data": {
"firstname": "pooja",
"lastname": "salot"
}
}'
```
