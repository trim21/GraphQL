import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ schema: 'bangumi', tableName: 'chii_apps' })
export class App {
  @PrimaryKey({ columnType: 'mediumint', name: 'app_id', autoincrement: true, type: Number })
  appID!: number;

  @Property({ name: 'app_type', columnType: 'tinyint', type: Boolean })
  appType!: boolean;

  @Property({ name: 'app_creator', columnType: 'mediumint', type: Number })
  appCreator!: number;

  @Property({ name: 'app_name', length: 255, columnType: 'varchar', type: String })
  appName!: string;

  @Property({ name: 'app_desc', columnType: 'mediumtext', type: String })
  appDesc!: string;

  @Property({ name: 'app_url', length: 2000, columnType: 'varchar', type: String })
  appUrl!: string;

  @Property({ name: 'app_collects', columnType: 'mediumint', type: Number })
  appCollects!: number;

  @Property({ name: 'app_status', columnType: 'tinyint', type: Boolean })
  appStatus!: boolean;

  @Property({ name: 'app_timestamp', columnType: 'int', type: Number })
  appTimestamp!: number;

  @Property({ name: 'app_lasttouch', columnType: 'int', type: Number })
  appLasttouch!: number;

  @Property({ name: 'app_ban', columnType: 'tinyint', type: Boolean })
  appBan!: boolean;
}
