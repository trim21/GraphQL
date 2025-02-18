import { setTimeout } from 'timers/promises';

import { DateTime } from 'luxon';
import { afterEach, beforeEach, expect, test } from 'vitest';

import { db, op } from '@app/drizzle/db.ts';
import { chiiOsWebSessions } from '@app/drizzle/schema.ts';

import { create, get, revoke } from './session.ts';
import { sql } from 'drizzle-orm';

beforeEach(async () => {
  await db.delete(chiiOsWebSessions);
});

afterEach(async () => {
  await db.delete(chiiOsWebSessions);
});

test('should create and get session', async () => {
  const token = await create({
    id: 382951,
    regTime: DateTime.fromISO('2010-01-10 10:05:20').toUnixInteger(),
  });

  const session = await db.query.chiiOsWebSessions.findFirst({
    where: sql`\`key\` = ${token} collate utf8mb4_bin`,
  });

  expect(session).toBeDefined();

  const auth = await get(token);

  expect(auth).toBeDefined();
  expect(auth).toMatchObject({
    login: true,
    groupID: 10,
    userID: 382951,
  });
});

test('should revoke session', async () => {
  const token = 'fake-random-session-token';
  await db.insert(chiiOsWebSessions).values({
    key: token,
    value: Buffer.from(''),
    userID: 0,
    createdAt: DateTime.now().toUnixInteger(),
    expiredAt: DateTime.now().toUnixInteger() + 60 * 60 * 242 * 30,
  });

  await revoke(token);
  const session = await db.query.chiiOsWebSessions.findFirst({
    where: op.eq(chiiOsWebSessions.key, token),
  });

  expect(session).toBeDefined();
  expect(session?.expiredAt).toBeLessThan(DateTime.now().toUnixInteger() + 1);
});
