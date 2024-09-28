import { BooleanTransformer, htmlEscapedString, UnixTimestamp } from '@app/lib/orm/transformer.ts';

import type { User } from './user.ts';
import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ schema: 'bangumi', tableName: 'chii_subjects' })
export class Subject {
  @PrimaryKey({
    type: 'mediumint',
    fieldName: 'subject_id',
    unsigned: true,
  })
  id!: number;

  @Property({
    type: 'smallint',
    name: 'subject_type_id',
    unsigned: true,
    default: "'0'",
  })
  typeID!: number;

  @Property({
    name: 'subject_name',
    length: 80,
    type: htmlEscapedString,
    columnType: 'varchar',
  })
  name!: string;

  @Property({
    name: 'subject_name_cn',
    length: 80,
    type: htmlEscapedString,
    columnType: 'varchar',
  })
  nameCN!: string;

  @Property({
    type: 'varchar',
    name: 'subject_uid',
    comment: 'isbn / imdb',
    length: 20,
  })
  subjectUid!: string;

  @Property({ name: 'subject_creator', unsigned: true, type: 'mediumint' })
  subjectCreator!: number;

  @Property({
    type: 'int',
    name: 'subject_dateline',
    unsigned: true,
    default: "'0'",
  })
  updatedAt!: number;

  @Property({ name: 'subject_image', length: 255, type: 'varchar' })
  subjectImage!: string;

  @Property({
    type: 'smallint',

    name: 'subject_platform',
    unsigned: true,
    default: "'0'",
  })
  platform!: number;

  @Property({ name: 'field_infobox', type: htmlEscapedString, columnType: 'mediumtext' })
  fieldInfobox!: string;

  @Property({
    type: 'mediumtext',
    name: 'field_summary',
    comment: 'summary',
  })
  fieldSummary!: string;

  @Property({ name: 'field_5', comment: 'author summary', type: 'mediumtext' })
  field_5!: string;

  @Property({
    type: 'mediumint',
    name: 'field_volumes',
    comment: '卷数',
    unsigned: true,
    default: "'0'",
  })
  fieldVolumes!: number;

  @Property({
    type: 'mediumint',

    name: 'field_eps',
    unsigned: true,
    default: "'0'",
  })
  fieldEps!: number;

  @Property({
    type: 'mediumint',

    name: 'subject_wish',
    unsigned: true,
    default: "'0'",
  })
  subjectWish!: number;

  @Property({
    type: 'mediumint',

    name: 'subject_collect',
    unsigned: true,
    default: "'0'",
  })
  subjectCollect!: number;

  @Property({
    type: 'mediumint',

    name: 'subject_doing',
    unsigned: true,
    default: "'0'",
  })
  subjectDoing!: number;

  @Property({
    type: 'mediumint',

    name: 'subject_on_hold',
    comment: '搁置人数',
    unsigned: true,
    default: "'0'",
  })
  subjectOnHold!: number;

  @Property({
    type: 'mediumint',

    name: 'subject_dropped',
    comment: '抛弃人数',
    unsigned: true,
    default: "'0'",
  })
  subjectDropped!: number;

  @Property({
    type: 'tinyint',

    name: 'subject_series',
    unsigned: true,
    default: "'0'",
  })
  subjectSeries!: number;

  @Property({
    type: 'mediumint',

    name: 'subject_series_entry',
    unsigned: true,
    default: "'0'",
  })
  subjectSeriesEntry!: number;

  @Property({ name: 'subject_idx_cn', length: 1, type: 'varchar' })
  subjectIdxCn!: string;

  @Property({ name: 'subject_airtime', unsigned: true, type: 'tinyint' })
  subjectAirtime!: number;

  @Property({
    name: 'subject_nsfw',
    type: BooleanTransformer,
    columnType: 'tinyint',
  })
  subjectNsfw!: boolean;

  @Property({
    type: 'tinyint',
    name: 'subject_ban',
    unsigned: true,
    default: "'0'",
  })
  subjectBan!: number;

  locked(): boolean {
    return this.subjectBan === 2;
  }

  @OneToOne(() => SubjectFields, (f) => f.subject)
  fields!: SubjectFields;
}

@Entity({ schema: 'bangumi', tableName: 'chii_subject_fields' })
export class SubjectFields {
  @OneToOne(() => Subject, {
    primary: true,
    mapToPk: true,
    joinColumn: 'field_sid',
    inverseJoinColumn: 'subject_id',
    unsigned: true,
  })
  subject!: Subject;

  @Property({
    type: 'smallint',

    name: 'field_tid',
    unsigned: true,
    default: "'0'",
  })
  fieldTid!: number;

  @Property({ name: 'field_tags', type: 'mediumtext' })
  fieldTags!: string;

  @Property({
    type: 'mediumint',

    name: 'field_rate_1',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_1!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_2',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_2!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_3',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_3!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_4',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_4!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_5',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_5!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_6',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_6!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_7',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_7!: number;

  @Property({
    type: 'mediumint',
    name: 'field_rate_8',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_8!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_9',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_9!: number;

  @Property({
    type: 'mediumint',

    name: 'field_rate_10',
    unsigned: true,
    default: "'0'",
  })
  fieldRate_10!: number;

  @Property({ name: 'field_airtime', unsigned: true, type: 'tinyint' })
  fieldAirtime!: number;

  @Property({ name: 'field_rank', unsigned: true, default: "'0'", type: 'int' })
  fieldRank!: number;

  @Property({ name: 'field_year', comment: '放送年份', type: 'year' })
  year!: number;

  @Property({ name: 'field_mon', comment: '放送月份', type: 'tinyint' })
  month!: number;

  @Property({
    type: 'tinyint',
    name: 'field_week_day',
    comment: '放送日(星期X)',
  })
  fieldWeekDay!: number;

  @Property({ name: 'field_date', comment: '放送日期', type: 'date' })
  date!: string;

  @Property({
    type: 'mediumint',

    name: 'field_redirect',
    unsigned: true,
    default: "'0'",
  })
  fieldRedirect!: number;
}

@Entity({ schema: 'bangumi', tableName: 'chii_subject_imgs' })
export class SubjectImage {
  @PrimaryKey({ type: 'mediumint', name: 'img_id', unsigned: true })
  id!: number;

  @Property({ name: 'img_subject_id', unsigned: true, type: 'mediumint' })
  subjectID!: number;

  @Property({ name: 'img_uid', unsigned: true, type: 'mediumint' })
  uid!: number;

  /**
   * Base file name,
   *
   * @example E4/da/5_wUARf.jpg
   */
  @Property({ name: 'img_target', length: 255, type: 'varchar' })
  target!: string;

  @Property({ name: 'img_vote', unsigned: true, type: 'mediumint' })
  vote!: number;

  @Property({ name: 'img_nsfw', unsigned: true, type: 'tinyint' })
  nsfw!: number;

  @Property({ name: 'img_ban', unsigned: true, type: 'tinyint' })
  ban!: number;

  @Property({
    columnType: 'int',
    name: 'img_dateline',
    unsigned: true,
    type: UnixTimestamp,
  })
  createdAt!: Date;
}

@Entity({ schema: 'bangumi', tableName: 'chii_subject_relations' })
export class SubjectRelation {
  @PrimaryKey({
    name: 'rlt_subject_id',
    comment: '关联主 ID',
    type: 'mediumint',
    unsigned: true,
  })
  subjectID!: number;

  @PrimaryKey({ name: 'rlt_subject_type_id', unsigned: true, type: 'tinyint' })
  subjectTypeID!: number;

  @Property({
    type: 'smallint',

    name: 'rlt_relation_type',
    comment: '关联类型',
    unsigned: true,
  })
  relationType!: number;

  @Property({
    type: 'mediumint',

    name: 'rlt_related_subject_id',
    comment: '关联目标 ID',
    unsigned: true,
  })
  relatedSubjectID!: number;

  @Property({
    type: 'tinyint',

    name: 'rlt_related_subject_type_id',
    comment: '关联目标类型',
    unsigned: true,
  })
  relatedSubjectTypeID!: number;

  /** @deprecated 未使用 */
  @PrimaryKey({ name: 'rlt_vice_versa', unsigned: true, type: 'tinyint' })
  viceVersa!: number;

  @Property({ name: 'rlt_order', comment: '关联排序', unsigned: true, type: 'tinyint' })
  order!: number;

  relatedSubject!: Subject;
}

@Entity({ schema: 'bangumi', tableName: 'chii_subject_topics' })
export class SubjectTopic {
  @PrimaryKey({
    type: 'mediumint',
    name: 'sbj_tpc_id',
    unsigned: true,
  })
  id!: number;

  @Property({ name: 'sbj_tpc_subject_id', unsigned: true, type: 'mediumint' })
  parentID!: number;

  @Property({ name: 'sbj_tpc_uid', unsigned: true, type: 'mediumint' })
  creatorID!: number;

  @Property({
    name: 'sbj_tpc_title',
    length: 80,
    type: htmlEscapedString,
    columnType: 'varchar',
  })
  title!: string;

  @Property({
    type: 'int',

    name: 'sbj_tpc_dateline',
    unsigned: true,
    default: "'0'",
  })
  createdAt!: number;

  @Property({
    type: 'int',

    name: 'sbj_tpc_lastpost',
    unsigned: true,
    default: "'0'",
  })
  updatedAt!: number;

  @Property({
    type: 'mediumint',

    name: 'sbj_tpc_replies',
    unsigned: true,
    default: "'0'",
  })
  replies!: number;

  @Property({ name: 'sbj_tpc_state', unsigned: true, type: 'tinyint' })
  state!: number;

  @Property({
    type: 'tinyint',

    name: 'sbj_tpc_display',
    unsigned: true,
    default: "'1'",
  })
  display!: number;

  creator!: User;
}

@Entity({ schema: 'bangumi', tableName: 'chii_subject_posts' })
export class SubjectPost {
  @PrimaryKey({ name: 'sbj_pst_id', type: 'mediumint', unsigned: true })
  id!: number;

  @Property({ name: 'sbj_pst_mid', unsigned: true, type: 'mediumint' })
  topicID!: number;

  @Property({ name: 'sbj_pst_uid', unsigned: true, type: 'mediumint' })
  uid!: number;

  @Property({ name: 'sbj_pst_related', unsigned: true, default: 0, type: 'mediumint' })
  related!: number;

  @Property({ name: 'sbj_pst_content', type: 'mediumint' })
  content!: string;

  @Property({ name: 'sbj_pst_state', unsigned: true, type: 'tinyint' })
  state!: number;

  @Property({ name: 'sbj_pst_dateline', unsigned: true, default: 0, type: 'int' })
  dateline!: number;

  creator!: User;
}

@Entity({ schema: 'bangumi', tableName: 'chii_subject_interests' })
export class SubjectInterest {
  @PrimaryKey({ type: 'int', name: 'interest_id', unsigned: true })
  id!: number;

  @Property({ name: 'interest_uid', unsigned: true, type: 'mediumint' })
  uid!: number;

  @Property({ name: 'interest_subject_id', unsigned: true, type: 'mediumint' })
  subjectID!: number;

  @Property({
    type: 'smallint',

    name: 'interest_subject_type',
    unsigned: true,
    default: "'0'",
  })
  subjectType!: number;

  @Property({
    type: 'tinyint',

    name: 'interest_rate',
    unsigned: true,
    default: "'0'",
  })
  rate!: number;

  @Property({
    type: 'tinyint',

    name: 'interest_type',
    unsigned: true,
    default: "'0'",
  })
  type!: number;

  @Property({ name: 'interest_has_comment', unsigned: true, type: 'tinyint' })
  hasComment!: number;

  @Property({ name: 'interest_comment', type: 'mediumtext' })
  comment!: string;

  @Property({ name: 'interest_tag', type: 'mediumtext' })
  tag!: string;

  @Property({
    type: 'mediumint',

    name: 'interest_ep_status',
    unsigned: true,
    default: "'0'",
  })
  epStatus!: number;

  @Property({
    type: 'mediumint',

    name: 'interest_vol_status',
    comment: '卷数',
    unsigned: true,
  })
  volStatus!: number;

  @Property({ name: 'interest_wish_dateline', unsigned: true, type: 'int' })
  wishDateline!: number;

  @Property({ name: 'interest_doing_dateline', unsigned: true, type: 'int' })
  doingDateline!: number;

  @Property({ name: 'interest_collect_dateline', unsigned: true, type: 'int' })
  collectDateline!: number;

  @Property({ name: 'interest_on_hold_dateline', unsigned: true, type: 'int' })
  onHoldDateline!: number;

  @Property({ name: 'interest_dropped_dateline', unsigned: true, type: 'int' })
  droppedDateline!: number;

  @Property({ name: 'interest_create_ip', length: 15, type: 'char' })
  createIp!: string;

  @Property({ name: 'interest_lasttouch_ip', length: 15, type: 'char' })
  lastTouchIp!: string;

  @Property({
    type: 'int',
    name: 'interest_lasttouch',
    unsigned: true,
    default: "'0'",
  })
  lastTouch!: number;

  @Property({ name: 'interest_private', unsigned: true, type: 'tinyint' })
  private!: number;
}
