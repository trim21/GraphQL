import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'chii_episodes', schema: 'bangumi' })
export class Episode {
  @PrimaryKey({ type: 'mediumint', name: 'ep_id', unsigned: true, autoincrement: true })
  id!: number;

  @Property({ name: 'ep_subject_id', unsigned: true, type: 'mediumint' })
  subjectID!: number;

  @Property({
    name: 'ep_sort',
    type: 'float',
    unsigned: true,
    precision: 12,
    default: "'0'",
  })
  sort!: number;

  @Property({ name: 'ep_type', unsigned: true, type: 'tinyint' })
  type!: number;

  @Property({
    type: 'tinyint',
    name: 'ep_disc',
    comment: '碟片数',
    unsigned: true,
    default: "'0'",
  })
  epDisc!: number;

  @Property({ name: 'ep_name', length: 80, type: 'varchar' })
  name!: string;

  @Property({ name: 'ep_name_cn', length: 80, type: 'varchar' })
  nameCN!: string;

  @Property({ name: 'ep_rate', type: 'tinyint' })
  epRate!: number;

  @Property({ name: 'ep_duration', length: 80, type: 'varchar' })
  duration!: string;

  @Property({ name: 'ep_airdate', length: 80, type: 'varchar' })
  airDate!: string;

  /** @deprecated 在线播放地址 */
  @Property({ name: 'ep_online', type: 'mediumtext' })
  epOnline!: string;

  @Property({ name: 'ep_comment', unsigned: true, type: 'mediumint' })
  epComment!: number;

  @Property({ name: 'ep_resources', unsigned: true, type: 'mediumint' })
  epResources!: number;

  @Property({ name: 'ep_desc', type: 'mediumtext' })
  summary!: string;

  @Property({ name: 'ep_dateline', unsigned: true, type: 'int' })
  epDateline!: number;

  @Property({ name: 'ep_lastpost', unsigned: true, type: 'int' })
  epLastPost!: number;

  @Property({ name: 'ep_lock', unsigned: true, default: "'0'", type: 'tinyint' })
  epLock!: number;

  @Property({ name: 'ep_ban', unsigned: true, default: "'0'", type: 'tinyint' })
  epBan!: number;
}

@Entity({ schema: 'bangumi', tableName: 'chii_ep_comments' })
export class EpisodeComment {
  @PrimaryKey({
    type: 'mediumint',
    name: 'ep_pst_id',
    unsigned: true,
    autoincrement: true,
  })
  id!: number;

  @Property({ name: 'ep_pst_mid', unsigned: true, type: 'mediumint' })
  epID!: number;

  @Property({ name: 'ep_pst_uid', unsigned: true, type: 'mediumint' })
  creatorID!: number;

  @Property({
    type: 'mediumint',

    name: 'ep_pst_related',
    unsigned: true,
    default: "'0'",
  })
  relatedID!: number;

  @Property({ name: 'ep_pst_dateline', unsigned: true, type: 'int' })
  createdAt!: number;

  @Property({ name: 'ep_pst_content', type: 'mediumtext' })
  content!: string;

  @Property({ name: 'ep_pst_state', default: "'0'", type: 'mediumtext' })
  state!: number;
}
