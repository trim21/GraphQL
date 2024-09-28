import { BooleanTransformer, htmlEscapedString } from '@app/lib/orm/transformer.ts';

import type { User } from './user';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ schema: 'bangumi', tableName: 'chii_groups' })
export class Group {
  @PrimaryKey({ type: 'smallint', name: 'grp_id', unsigned: true })
  id!: number;

  @Property({ name: 'grp_cat', unsigned: true, default: "'0'", type: 'smallint' })
  cat!: number;

  @Property({ name: 'grp_name', length: 50, type: 'char' })
  name!: string;

  @Property({ name: 'grp_title', length: 50, type: 'char' })
  title!: string;

  @Property({ name: 'grp_icon', length: 255, type: 'varchar' })
  icon!: string;

  @Property({
    name: 'grp_creator',
    unsigned: true,
    type: 'mediumint',
    default: "'0'",
  })
  grpCreator!: number;

  @Property({
    name: 'grp_topics',
    unsigned: true,
    type: 'mediumint',
    default: "'0'",
  })
  grpTopics!: number;

  @Property({
    name: 'grp_posts',
    unsigned: true,
    type: 'mediumint',
    default: "'0'",
  })
  grpPosts!: number;

  @Property({
    name: 'grp_members',
    unsigned: true,
    type: 'mediumint',
    default: "'1'",
  })
  memberCount!: number;

  @Property({ name: 'grp_desc', type: 'text' })
  description!: string;

  @Property({ name: 'grp_lastpost', unsigned: true, type: 'int' })
  lastPost!: number;

  @Property({ name: 'grp_builddate', unsigned: true, type: 'int' })
  builddate!: number;

  @Property({
    name: 'grp_accessible',
    comment: '可访问性',
    default: "'1'",
    type: 'tinyint',
  })
  accessible!: boolean;

  @Property({
    name: 'grp_nsfw',
    unsigned: true,
    columnType: 'tinyint',
    type: BooleanTransformer,
  })
  nsfw!: boolean;
}

@Entity({ schema: 'bangumi', tableName: 'chii_group_members' })
export class GroupMembers {
  @Property({ primary: true, name: 'gmb_uid', default: "'0'", type: 'mediumint' })
  gmbUid!: number;

  @Property({ primary: true, name: 'gmb_gid', default: "'0'", type: 'smallint' })
  gmbGid!: number;

  @Property({ name: 'gmb_moderator', default: "'0'", type: 'tinyint' })
  gmbModerator!: boolean;

  @Property({ name: 'gmb_dateline', unsigned: true, default: "'0'", type: 'int' })
  gmbDateline!: number;
}

@Entity({ schema: 'bangumi', tableName: 'chii_group_topics' })
export class GroupTopic {
  @PrimaryKey({
    type: 'mediumint',
    name: 'grp_tpc_id',
    unsigned: true,
  })
  id!: number;

  @Property({ name: 'grp_tpc_gid', unsigned: true, type: 'mediumint' })
  parentID!: number;

  @Property({ name: 'grp_tpc_uid', unsigned: true, type: 'mediumint' })
  creatorID!: number;

  @Property({
    name: 'grp_tpc_title',
    length: 80,
    type: htmlEscapedString,
    columnType: 'varchar',
  })
  title!: string;

  @Property({
    type: 'int',
    name: 'grp_tpc_dateline',
    unsigned: true,
    default: "'0'",
  })
  createdAt!: number;

  @Property({
    type: 'int',
    name: 'grp_tpc_lastpost',
    unsigned: true,
    default: "'0'",
  })
  updatedAt!: number;

  @Property({
    type: 'mediumint',

    name: 'grp_tpc_replies',
    unsigned: true,
    default: "'0'",
  })
  replies!: number;

  @Property({ name: 'grp_tpc_state', unsigned: true, type: 'tinyint' })
  state!: number;

  @Property({
    type: 'tinyint',

    name: 'grp_tpc_display',
    unsigned: true,
    default: "'1'",
  })
  display!: number;

  creator!: User;
}

@Entity({ schema: 'bangumi', tableName: 'chii_group_posts' })
export class GroupPost {
  @PrimaryKey({
    type: 'mediumint',
    name: 'grp_pst_id',
    unsigned: true,
  })
  id!: number;

  @Property({ name: 'grp_pst_mid', unsigned: true, type: 'mediumint' })
  topicID!: number;

  @Property({ name: 'grp_pst_uid', unsigned: true, type: 'mediumint' })
  uid!: number;

  @Property({
    type: 'mediumint',

    name: 'grp_pst_related',
    comment: '关联回复ID',
    unsigned: true,
    default: "'0'",
  })
  related!: number;

  @Property({ name: 'grp_pst_content', type: 'mediumtext' })
  content!: string;

  @Property({ name: 'grp_pst_state', unsigned: true, type: 'tinyint' })
  state!: number;

  @Property({
    type: 'int',

    name: 'grp_pst_dateline',
    unsigned: true,
    default: "'0'",
  })
  dateline!: number;

  creator!: User;
}
