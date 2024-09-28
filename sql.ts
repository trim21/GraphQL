import { sql as SQL } from '@mikro-orm/mysql';

export default function sql(
  strings: readonly string[],
  ...values: readonly (string | number | boolean)[]
): [string, any[]] {
  const s = SQL(strings, ...values);
  return [s.sql, s.params];
}
