import { sql } from '@mikro-orm/mysql';

const s = sql`select *
              from chii_subjects
              where subject_id = ${1}`;

console.log(s);
