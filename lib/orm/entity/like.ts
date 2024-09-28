import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { UnixTimestamp } from '@app/lib/orm/transformer.ts';

const TYPE_SUBJECT_COVER = 1;
const TYPE_GROUP_TOPIC = 7;
const TYPE_GROUP_REPLY = 8;
const TYPE_SBJ_REPLY = 10;
const TYPE_EP_REPLY = 11;

/** 用于点赞/封面投票 */
@Entity({ schema: 'bangumi', tableName: 'chii_likes' })
export class Like {
  static readonly TYPE_SUBJECT_COVER = TYPE_SUBJECT_COVER;

  static readonly TYPE_GROUP_TOPIC = TYPE_GROUP_TOPIC;
  static readonly TYPE_GROUP_REPLY = TYPE_GROUP_REPLY;

  static readonly TYPE_SBJ_REPLY = TYPE_SBJ_REPLY;
  static readonly TYPE_EP_REPLY = TYPE_EP_REPLY;

  static readonly $like_types = [TYPE_GROUP_REPLY, TYPE_SBJ_REPLY, TYPE_EP_REPLY] as const;

  static readonly $allow_reaction_types = [
    TYPE_GROUP_REPLY,
    TYPE_SBJ_REPLY,
    TYPE_EP_REPLY,
  ] as const;

  public static readonly like_reactions_allowed: ReadonlySet<number> = Object.freeze(
    new Set([
      0, // bgm67
      140, // bgm124
      80, // bgm64
      54, // bgm38
      85, // bgm69

      104, // bgm88
      88, // bgm72
      62, // bgm46
      79, // bgm63
      53, // bgm37

      122, // bgm106
      92, // bgm76
      118, // bgm102
      141, // bgm125
      90, // bgm74

      76, // bgm60
      60, // bgm44
      128, // bgm112
      47, // bgm31
      68, // bgm52

      137, // bgm121
      132, // bgm116
    ]),
  );

  @Property({ primary: true, name: 'type', unsigned: true, type: 'mediumint' })
  type!: number;

  @Property({ primary: true, name: 'related_id', type: 'mediumint' })
  relatedID!: number;

  @Property({ unsigned: true, name: 'main_id', default: '0', type: 'mediumint' })
  mainID!: number;

  @Property({ primary: true, name: 'uid', unsigned: true, type: 'mediumint' })
  uid!: number;

  @Property({ name: 'value', unsigned: true, type: 'mediumint' })
  value = 0;

  @Property({ name: 'ban', unsigned: true, default: "'0'", type: 'tinyint' })
  ban = 0;

  /** Use `@CreateDateColumn` after https://github.com/typeorm/typeorm/issues/8701 is fixed */
  @Property({
    name: 'created_at',
    comment: 'unix timestamp seconds',
    unsigned: true,
    columnType: 'int',
    type: UnixTimestamp,
  })
  createdAt!: Date;
}
