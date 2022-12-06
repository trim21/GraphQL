import type { FastifyInstance } from 'fastify';
import type {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify/types/utils';
import type { FastifyBaseLogger } from 'fastify/types/logger';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export type App = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;
