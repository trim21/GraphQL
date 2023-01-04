import IORedis from 'ioredis';

import { redisOption } from './config.ts';

export default new IORedis(redisOption);
export const Subscriber = new IORedis(redisOption);
