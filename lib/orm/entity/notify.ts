import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BooleanTransformer } from '@app/lib/orm/transformer.ts';

@Entity({ schema: 'bangumi', tableName: 'chii_notify' })
export class Notify {
  @PrimaryKey({ type: 'mediumint', name: 'nt_id', unsigned: true })
  id!: number;

  @Property({ name: 'nt_uid', unsigned: true, type: 'mediumint' })
  uid!: number;

  @Property({ name: 'nt_from_uid', unsigned: true, type: 'mediumint' })
  from_uid!: number;

  @Property({
    columnType: 'tinyint',
    name: 'nt_status',
    unsigned: true,
    default: "'1'",
    type: BooleanTransformer,
  })
  unread!: boolean;

  @Property({ name: 'nt_type', unsigned: true, default: "'0'", type: 'tinyint' })
  type!: number;

  @Property({
    type: 'mediumint',

    name: 'nt_mid',
    comment: 'ID in notify_field',
    unsigned: true,
  })
  notify_field_id!: number;

  @Property({ name: 'nt_related_id', unsigned: true, type: 'int' })
  postID!: number;

  @Property({ name: 'nt_dateline', unsigned: true, type: 'int' })
  dateline!: number;
}

@Entity({ schema: 'bangumi', tableName: 'chii_notify_field' })
export class NotifyField {
  @PrimaryKey({ type: 'mediumint', name: 'ntf_id', unsigned: true })
  id!: number;

  @Property({ name: 'ntf_hash', unsigned: true, default: "'0'", type: 'tinyint' })
  hash!: number;

  @Property({ name: 'ntf_rid', unsigned: true, type: 'int' })
  topicID!: number;

  @Property({ name: 'ntf_title', length: 255, type: 'varchar' })
  title!: string;
}
