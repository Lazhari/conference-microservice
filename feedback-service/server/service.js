const express = require('express');
const amqplib = require('amqplib');

const initDb = require('../models');
const databaseConfig = require('../config/database');

const service = express();

const Feedback = require('./lib/Feedback');

module.exports = (config) => {
  const { Feedback: FeedbackEntity } = initDb(
    databaseConfig[process.env.NODE_ENV || 'development'],
  );
  const feedback = new Feedback(FeedbackEntity);
  const log = config.log();
  // Set up the RabbitMQ consumer for the feedback service
  const q = 'feedback';
  amqplib
    .connect(process.env.RABBIT_HOST || 'amqp://admin:adm_i_@rabbitmq')
    .then((conn) => conn.createChannel())
    .then((ch) =>
      ch.assertQueue(q).then(() =>
        ch.consume(q, (msg) => {
          if (msg !== null) {
            log.debug(`Got message ${msg.content.toString()}`);
            const qm = JSON.parse(msg.content.toString());
            feedback
              .addEntry(qm.name, qm.title, qm.message)
              .then(() => ch.ack(msg));
          }
        }),
      ),
    )
    .catch((err) => log.fatal(err));

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.get('/list', async (req, res, next) => {
    try {
      return res.json(await feedback.getList());
    } catch (error) {
      return next(error);
    }
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
