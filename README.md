# kafka-test

Experiments with Kafka, Node, and Docker.

# Usage

To run the containers, run:

```sh
docker-compose up --build
```

You will see the results of the Node app in your terminal.

When you're done, run:

```sh
docker-compose down
```

This will tear down all remaining containers and networks.

# Undockerized Node App

You can run the Node app locally using:

```sh
npm start
```

But first you need to do 2 things:

- Comment out the `app` service from `docker-compose.yml`
- Change the broker url in `index.js` from `kafka:9092` to `localhost:9094`
