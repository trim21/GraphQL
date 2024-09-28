import { promisify } from 'node:util';
import * as zlib from 'node:zlib';

import * as php from '@trim21/php-serialize';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

const inflateRaw = promisify(zlib.inflateRaw);
const deflateRaw = promisify(zlib.deflateRaw);

/* eslint-disable @typescript-eslint/no-unused-vars */

const TypeSubject = 1; // 条目
const TypeSubjectCharacterRelation = 5; // 条目->角色关联
const TypeSubjectCastRelation = 6; // 条目->声优关联
const TypeSubjectPersonRelation = 10; // 条目->人物关联
const TypeSubjectMerge = 11; // 条目管理
const TypeSubjectErase = 12;
const TypeSubjectRelation = 17; // 条目关联
const TypeSubjectLock = 103;
const TypeSubjectUnlock = 104;
const TypeCharacter = 2; // 角色
const TypeCharacterSubjectRelation = 4; // 角色->条目关联
const TypeCharacterCastRelation = 7; // 角色->声优关联
const TypeCharacterMerge = 13; // 角色管理
const TypeCharacterErase = 14;
const TypePerson = 3; // 人物
const TypePersonCastRelation = 8; // 人物->声优关联
const TypePersonSubjectRelation = 9; // 人物->条目关联
const TypePersonMerge = 15; // 人物管理
const TypePersonErase = 16;
const TypeEp = 18; // 章节
const TypeEpMerge = 181; // 章节管理
const TypeEpMove = 182;
const TypeEpLock = 183;
const TypeEpUnlock = 184;
const TypeEpErase = 185;

/* eslint-enable @typescript-eslint/no-unused-vars */

@Entity({ schema: 'bangumi', tableName: 'chii_rev_history' })
export class RevHistory {
  static readonly TypeEp = TypeEp;

  static episodeTypes = [
    TypeEp,
    TypeEpMerge,
    TypeEpMove,
    TypeEpLock,
    TypeEpUnlock,
    TypeEpErase,
  ] as const;

  @PrimaryKey({ type: 'mediumint', name: 'rev_id', unsigned: true })
  revId!: number;

  @Property({
    type: 'tinyint',
    name: 'rev_type',
    comment: '条目，角色，人物',
    unsigned: true,
  })
  revType!: number;

  @Property({
    type: 'mediumint',
    name: 'rev_mid',
    comment: '对应条目，人物的ID',
    unsigned: true,
  })
  revMid!: number;

  @Property({ name: 'rev_text_id', unsigned: true, type: 'mediumint' })
  revTextId!: number;

  @Property({ name: 'rev_dateline', unsigned: true, type: 'int' })
  revDateline!: number;

  @Property({ name: 'rev_creator', unsigned: true, type: 'mediumint' })
  revCreator!: number;

  @Property({ name: 'rev_edit_summary', length: 200, type: 'varchar' })
  revEditSummary!: string;
}

@Entity({ schema: 'bangumi', tableName: 'chii_rev_text' })
export class RevText {
  @PrimaryKey({
    type: 'mediumint',
    name: 'rev_text_id',
    unsigned: true,
  })
  revTextId!: number;

  @Property({ name: 'rev_text', columnType: 'mediumblob', type: Buffer })
  revText!: Buffer;

  static async parse<R = unknown>(
    revTexts: RevText[],
  ): Promise<
    {
      id: number;
      data: Record<number, R>;
    }[]
  > {
    return await Promise.all(
      revTexts.map(async (x) => {
        return {
          id: x.revTextId,
          data: (await this.deserialize(x.revText)) as Record<number, R>,
        };
      }),
    );
  }

  static async deserialize(o: Buffer): Promise<Record<string, unknown>> {
    return php.parse(await inflateRaw(o)) as Record<string, unknown>;
  }

  static async serialize(o: unknown): Promise<Buffer> {
    return await deflateRaw(php.stringify(o));
  }
}

@Entity({ schema: 'bangumi', tableName: 'chii_ep_revisions' })
export class EpRevision {
  @PrimaryKey({
    type: 'mediumint',
    name: 'ep_rev_id',
    unsigned: true,
  })
  epRevId!: number;

  @Property({ name: 'rev_sid', unsigned: true, type: 'mediumint' })
  revSid!: number;

  @Property({ name: 'rev_eids', length: 255, type: 'varchar' })
  revEids!: string;

  @Property({ name: 'rev_ep_infobox', type: 'mediumtext' })
  revEpInfobox!: string;

  @Property({ name: 'rev_creator', unsigned: true, type: 'mediumint' })
  revCreator!: number;

  @Property({
    type: 'tinyint',
    name: 'rev_version',
    unsigned: true,
    default: "'0'",
  })
  revVersion!: number;

  @Property({ name: 'rev_dateline', unsigned: true, type: 'int' })
  revDateline!: number;

  @Property({ name: 'rev_edit_summary', length: 200, type: 'varchar' })
  revEditSummary!: string;
}

export interface EpTextRev {
  ep_sort: string;
  ep_type: string;
  ep_name: string;
  ep_name_cn: string;
  ep_duration: string;
  ep_airdate: string;
  ep_desc: string;
}
