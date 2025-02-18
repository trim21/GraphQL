import { getSlimCacheKey } from '@app/lib/group/cache';
import redis from '@app/lib/redis.ts';

import { EventOp } from './type';

interface GroupKey {
  grp_id: number;
}

interface Payload {
  op: EventOp;
}

export async function handle(key: string, value: string) {
  const idx = JSON.parse(key) as GroupKey;
  const payload = JSON.parse(value) as Payload;
  switch (payload.op) {
    case EventOp.Create: {
      break;
    }
    case EventOp.Update:
    case EventOp.Delete: {
      await redis.del(getSlimCacheKey(idx.grp_id));
      break;
    }
    case EventOp.Snapshot: {
      break;
    }
  }
}
