import { registerAs } from '@nestjs/config';

export default registerAs('rabbitMQ', () => ({
  host: process.env.RABBITMQ_HOST,
  port: process.env.RABBITMQ_PORT || 5672,
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
  queue: process.env.RABBITMQ_QUEUE
}));
