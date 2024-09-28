import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ schema: 'bangumi', tableName: 'chii_subject_revisions' })
export class SubjectRev {
  @PrimaryKey({ type: 'mediumint', name: 'rev_id', unsigned: true })
  id!: number;

  @Property({
    name: 'rev_type',
    comment: '修订类型',
    unsigned: true,
    type: 'int',
    default: "'1'",
  })
  type!: number;

  @Property({ name: 'rev_subject_id', unsigned: true, type: 'mediumint' })
  subjectID!: number;

  @Property({
    type: 'smallint',
    name: 'rev_type_id',
    unsigned: true,
    default: "'0'",
  })
  typeID!: number;

  @Property({ name: 'rev_creator', unsigned: true, type: 'mediumint' })
  creatorID!: number;

  @Property({ name: 'rev_dateline', unsigned: true, default: "'0'", type: 'int' })
  createdAt!: number;

  @Property({ name: 'rev_name', length: 80, type: 'varchar' })
  name!: string;

  @Property({ name: 'rev_name_cn', length: 80, type: 'varchar' })
  nameCN!: string;

  @Property({ name: 'rev_field_infobox', type: 'mediumtext' })
  infobox!: string;

  @Property({ name: 'rev_field_summary', type: 'mediumtext' })
  summary!: string;

  /** @deprecated 未使用 */
  @Property({ name: 'rev_vote_field', type: 'mediumtext' })
  revVoteField!: string;

  @Property({ name: 'rev_field_eps', unsigned: true, type: 'mediumint' })
  eps!: number;

  @Property({ name: 'rev_edit_summary', length: 200, type: 'varchar' })
  commitMessage!: string;

  @Property({ name: 'rev_platform', unsigned: true, type: 'smallint' })
  platform!: number;
}
