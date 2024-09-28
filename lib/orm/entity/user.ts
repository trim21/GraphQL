import { Entity, OneToOne, PrimaryKey, Property, Type } from '@mikro-orm/core';

import type { ACL } from '@app/lib/auth/acl.ts';
import { htmlEscapedString } from '@app/lib/orm/transformer.ts';
import type { UnknownObject } from '@app/lib/types/res.ts';

class UserACLType extends Type<UnknownObject, string> {
  convertToDatabaseValue(value: UnknownObject): string {
    return JSON.stringify(
      Object.fromEntries(
        Object.entries(value).map(([key, value]) => {
          return [key, value ? '1' : '0'];
        }),
      ),
    );
  }

  convertToJSValue(value: string): UnknownObject {
    if (!value) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(JSON.parse(value) as UnknownObject).map(([key, value]) => {
        return [key, typeof value === 'string' ? value === '1' : value];
      }),
    );
  }
}

@Entity({ schema: 'bangumi', tableName: 'chii_members' })
export class User {
  @PrimaryKey({ type: 'mediumint', name: 'uid', unsigned: true })
  id!: number;

  @Property({ name: 'username', unique: true, length: 15, type: 'char' })
  username!: string;

  @Property({ name: 'nickname', length: 30, type: 'varchar' })
  nickname!: string;

  @Property({ name: 'avatar', length: 255, type: 'varchar' })
  avatar!: string;

  @Property({ name: 'groupid', unsigned: true, default: "'0'", type: 'smallint' })
  groupid!: number;

  @Property({ name: 'regdate', unsigned: true, default: "'0'", type: 'int' })
  regdate!: number;

  @Property({ name: 'lastvisit', unsigned: true, default: "'0'", type: 'int' })
  lastvisit!: number;

  @Property({ name: 'lastactivity', unsigned: true, default: "'0'", type: 'int' })
  lastactivity!: number;

  @Property({ name: 'lastpost', unsigned: true, default: "'0'", type: 'int' })
  lastPost!: number;

  @Property({ name: 'dateformat', length: 10, type: 'char' })
  dateformat!: string;

  @Property({ name: 'timeformat', default: "'0'", type: 'tinyint' })
  timeformat!: boolean;

  @Property({ name: 'timeoffset', length: 4, type: 'char' })
  timeoffset!: string;

  @Property({ name: 'newpm', default: "'0'", type: 'tinyint' })
  newpm!: boolean;

  @Property({
    columnType: 'smallint',
    name: 'new_notify',
    comment: '新提醒',
    unsigned: true,
    default: "'0'",
    type: Number,
  })
  newNotify!: number;

  @Property({
    columnType: 'varchar',
    name: 'sign',
    length: 255,
    type: htmlEscapedString,
  })
  sign!: string;

  @Property({ name: 'password_crypt', length: 64, type: 'char' })
  passwordCrypt!: string;

  @Property({ name: 'email', length: 50, type: 'char' })
  email!: string;

  @OneToOne(() => UserField)
  fields!: UserField;

  @Property({
    columnType: 'mediumtext',
    name: 'acl',
    type: UserACLType,
  })
  acl!: ACL;
}

@Entity({ schema: 'bangumi', tableName: 'chii_memberfields' })
export class UserField {
  @Property({
    columnType: 'mediumint',
    primary: true,
    name: 'uid',
    unsigned: true,
    default: "'0'",
    type: Number,
  })
  uid!: number;

  @Property({ name: 'site', length: 75, type: 'varchar' })
  site!: string;

  @Property({ name: 'location', length: 30, type: 'varchar' })
  location!: string;

  @Property({ name: 'bio', type: 'text' })
  bio!: string;

  @Property({ name: 'privacy', type: 'mediumtext' })
  privacy!: string;

  @Property({ name: 'blocklist', type: 'mediumtext' })
  blocklist!: string;
}

@Entity({ schema: 'bangumi', tableName: 'chii_usergroup' })
export class UserGroup {
  @PrimaryKey({
    type: 'mediumint',
    name: 'usr_grp_id',
    unsigned: true,
  })
  id!: number;

  @Property({ name: 'usr_grp_name', length: 255, type: 'varchar' })
  name!: string;

  @Property({ name: 'usr_grp_perm', type: 'mediumtext' })
  Permission!: string;

  @Property({ name: 'usr_grp_dateline', unsigned: true, type: 'int' })
  updatedAt!: number;
}

@Entity({ schema: 'bangumi', tableName: 'chii_friends' })
export class Friends {
  @PrimaryKey({
    name: 'frd_uid',
    unsigned: true,
    type: 'mediumint',
    default: "'0'",
  })
  frdUid!: number;

  @PrimaryKey({
    name: 'frd_fid',
    unsigned: true,
    type: 'mediumint',
    default: "'0'",
  })
  frdFid!: number;

  @Property({
    type: 'tinyint',
    name: 'frd_grade',
    unsigned: true,
    default: "'1'",
  })
  frdGrade!: number;

  @Property({ name: 'frd_dateline', unsigned: true, default: "'0'", type: 'int' })
  frdDateline!: number;

  @Property({ name: 'frd_description', length: 255, type: 'char' })
  frdDescription!: string;
}
