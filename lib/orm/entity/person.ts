import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import type { Subject } from './subject.ts';

@Entity({ schema: 'bangumi', tableName: 'chii_persons' })
export class Person {
  @PrimaryKey({
    type: 'mediumint',
    name: 'prsn_id',
    unsigned: true,
  })
  id!: number;

  @Property({ name: 'prsn_name', length: 255, type: 'varchar' })
  name!: string;

  @Property({
    type: 'tinyint',
    name: 'prsn_type',
    comment: '个人，公司，组合',
    unsigned: true,
  })
  type!: number;

  @Property({ name: 'prsn_infobox', type: 'mediumtext' })
  infobox!: string;

  @Property({ name: 'prsn_producer', type: 'tinyint' })
  producer!: boolean;

  @Property({ name: 'prsn_mangaka', type: 'tinyint' })
  mangaka!: boolean;

  @Property({ name: 'prsn_artist', type: 'tinyint' })
  artist!: boolean;

  @Property({ name: 'prsn_seiyu', type: 'tinyint' })
  seiyu!: boolean;

  @Property({
    type: 'tinyint',

    name: 'prsn_writer',
    comment: '作家',
    default: "'0'",
  })
  writer!: boolean;

  @Property({
    type: 'tinyint',

    name: 'prsn_illustrator',
    comment: '绘师',
    default: "'0'",
  })
  illustrator!: boolean;

  @Property({ name: 'prsn_actor', comment: '演员', type: 'tinyint' })
  actor!: boolean;

  @Property({ name: 'prsn_summary', type: 'mediumtext' })
  summary!: string;

  @Property({ name: 'prsn_img', length: 255, type: 'varchar' })
  img!: string;

  @Property({ name: 'prsn_img_anidb', length: 255, type: 'varchar' })
  imgAnidb!: string;

  @Property({ name: 'prsn_comment', unsigned: true, type: 'mediumint' })
  comment!: number;

  @Property({ name: 'prsn_collects', unsigned: true, type: 'mediumint' })
  collects!: number;

  @Property({ name: 'prsn_dateline', unsigned: true, type: 'int' })
  updatedAt!: number;

  @Property({ name: 'prsn_lastpost', unsigned: true, type: 'int' })
  lastPost!: number;

  @Property({ name: 'prsn_lock', type: 'tinyint' })
  lock!: number;

  @Property({ name: 'prsn_anidb_id', unsigned: true, type: 'mediumint' })
  anidbID!: number;

  @Property({ name: 'prsn_ban', unsigned: true, default: "'0'", type: 'tinyint' })
  ban!: number;

  @Property({
    type: 'int',

    name: 'prsn_redirect',
    unsigned: true,
    default: "'0'",
  })
  redirect!: number;

  @Property({ name: 'prsn_nsfw', unsigned: true, type: 'tinyint' })
  nsfw!: boolean;
}

@Entity({ schema: 'bangumi', tableName: 'chii_person_cs_index' })
export class PersonSubjects {
  // @Column("enum", { primary: true, name: "prsn_type", enum: ["prsn", "crt"] })
  // personType: "prsn" | "crt";

  @PrimaryKey({ type: 'mediumint', primary: true, name: 'prsn_id', unsigned: true })
  personID!: number;

  @Property({
    type: 'smallint',

    primary: true,
    name: 'prsn_position',
    comment: '监督，原案，脚本,..',
    unsigned: true,
  })
  position!: number;

  @PrimaryKey({ type: 'mediumint', primary: true, name: 'subject_id', unsigned: true })
  subjectID!: number;

  @Property({ name: 'subject_type_id', unsigned: true, type: 'tinyint' })
  subjectTypeID!: number;

  @Property({ name: 'summary', type: 'mediumtext' })
  summary!: string;

  // @Property({type: 'mediumtext',

  //   name: 'prsn_appear_eps',
  //   comment: '可选，人物参与的章节',
  // })
  // appearEps: string;

  person!: Person;

  subject!: Subject;
}
