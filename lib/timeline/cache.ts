export function getItemCacheKey(id: number): string {
  return `tml:item:${id}`;
}

export function getUserCacheKey(uid: number | string) {
  return `tml:v2:user:${uid}`;
}

export function getUserVisitCacheKey(uid: number) {
  return `tml:visit:user:${uid}`;
}

export function getInboxCacheKey(uid: number | string) {
  return `tml:v2:inbox:${uid}`;
}

export function getInboxVisitCacheKey(uid: number) {
  return `tml:visit:inbox:${uid}`;
}
