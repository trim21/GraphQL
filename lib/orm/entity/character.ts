import type { Person } from './person.ts';
import type { Subject } from './subject.ts';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ schema: 'bangumi', tableName: 'chii_characters' })
export class Character {
  @PrimaryKey({ type: 'mediumint', name: 'crt_id', unsigned: true })
  id!: number;

  @Property({ name: 'crt_name', length: 255, columnType: 'varchar', type: String })
  name!: string;

  @Property({
    name: 'crt_role',
    comment: '角色，机体，组织。。',
    columnType: 'tinyint',
    unsigned: true,
    type: Number,
  })
  role!: number;

  @Property({ name: 'crt_infobox', columnType: 'mediumtext', type: String })
  infobox!: string;

  @Property({ name: 'crt_summary', columnType: 'mediumtext', type: String })
  summary!: string;

  @Property({ name: 'crt_img', length: 255, columnType: 'varchar', type: String })
  img!: string;

  @Property({
    name: 'crt_comment',
    columnType: 'mediumint',
    unsigned: true,
    default: "'0'",
    type: Number,
  })
  comment!: number;

  @Property({ name: 'crt_collects', unsigned: true, columnType: 'mediumint', type: Number })
  collects!: number;

  @Property({ name: 'crt_dateline', unsigned: true, columnType: 'int', type: Number })
  updatedAt!: number;

  @Property({ name: 'crt_lastpost', unsigned: true, columnType: 'int', type: Number })
  lastPost!: number;

  @Property({ name: 'crt_lock', default: "'0'", columnType: 'tinyint', type: Number })
  lock!: number;

  @Property({ name: 'crt_img_anidb', length: 255, columnType: 'varchar', type: String })
  imgAnidb!: string;

  @Property({ name: 'crt_anidb_id', unsigned: true, columnType: 'mediumint', type: Number })
  anidbID!: number;

  @Property({
    name: 'crt_ban',
    unsigned: true,
    default: "'0'",
    columnType: 'tinyint',
    type: Number,
  })
  ban!: number;

  @Property({
    name: 'crt_redirect',
    unsigned: true,
    default: "'0'",
    columnType: 'int',
    type: Number,
  })
  redirect!: number;

  @Property({ name: 'crt_nsfw', unsigned: true, columnType: 'tinyint', type: Boolean })
  nsfw!: boolean;
}

@Entity({ schema: 'bangumi', tableName: 'chii_crt_subject_index' })
export class CharacterSubjects {
  @PrimaryKey({ primary: true, name: 'crt_id', unsigned: true, type: 'mediumint' })
  characterID!: number;

  @PrimaryKey({ primary: true, name: 'subject_id', unsigned: true, type: 'mediumint' })
  subjectID!: number;

  @Property({ name: 'subject_type_id', unsigned: true, type: 'tinyint' })
  subjectTypeID!: number;

  @Property({
    name: 'crt_type',
    comment: '主角，配角',
    type: 'tinyint',
    unsigned: true,
  })
  type!: number;

  // @Property({columnType: 'mediumtext',

  //   name: 'ctr_appear_eps',
  //   comment: '可选，角色出场的的章节',
  // })
  // appearEps: string;

  @Property({ name: 'crt_order', unsigned: true, type: 'tinyint' })
  order!: number;

  character!: Character;

  subject!: Subject;
}

@Entity({ schema: 'bangumi', tableName: 'chii_crt_cast_index' })
export class Cast {
  @PrimaryKey({
    columnType: 'mediumint',
    primary: true,
    name: 'crt_id',
    unsigned: true,
    type: Number,
  })
  characterID!: number;

  @PrimaryKey({
    columnType: 'mediumint',
    primary: true,
    name: 'prsn_id',
    unsigned: true,
    type: Number,
  })
  personID!: number;

  @PrimaryKey({
    columnType: 'mediumint',
    primary: true,
    name: 'subject_id',
    unsigned: true,
    type: Number,
  })
  subjectID!: number;

  @Property({
    name: 'subject_type_id',
    comment: '根据人物归类查询角色，动画，书籍，游戏',
    columnType: 'tinyint',
    unsigned: true,
    type: Number,
  })
  subjectTypeID!: number;

  @Property({
    name: 'summary',
    columnType: 'varchar',
    comment: '幼年，男乱马，女乱马，变身形态，少女形态。。',
    length: 255,
    type: String,
  })
  summary!: string;

  character!: Character;
  person!: Person;
  subject!: Subject;
}
