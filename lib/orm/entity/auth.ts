import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'chii_oauth_access_tokens', schema: 'bangumi' })
export class OauthAccessTokens {
  @PrimaryKey({ type: 'mediumint', name: 'id', autoincrement: true })
  id!: number;

  @Property({ name: 'type', unsigned: true, default: "'0'", type: 'tinyint' })
  type!: number;

  @Property({ name: 'access_token', unique: true, length: 40, type: 'varchar' })
  accessToken!: string;

  @Property({ name: 'client_id', length: 80, type: 'varchar' })
  clientId!: string;

  @Property({ name: 'user_id', nullable: true, length: 80, type: 'varchar' })
  userId!: string;

  @Property({ name: 'expires', default: 'CURRENT_TIMESTAMP', type: 'timestamp' })
  expires!: Date;

  @Property({ name: 'scope', nullable: true, length: 4000, type: 'varchar' })
  scope: string | undefined;

  @Property({ name: 'info', length: 255, type: 'varchar' })
  info!: string;
}

@Entity({ schema: 'bangumi', tableName: 'chii_os_web_sessions' })
export class WebSessions {
  @Property({
    primary: true,
    name: 'key',
    type: 'char',
    comment: 'session key',
    length: 64,
  })
  key!: string;

  @Property({ name: 'user_id', comment: 'uint32 user id', unsigned: true, type: 'int' })
  userID!: number;

  @Property({ name: 'value', comment: 'json encoded session data', type: 'mediumblob' })
  value!: Buffer;

  @Property({
    name: 'created_at',
    type: 'bigint',
    comment: 'int64 unix timestamp, when session is created',
  })
  createdAt!: number;

  @Property({
    name: 'expired_at',
    type: 'bigint',
    comment: 'int64 unix timestamp, when session is expired',
  })
  expiredAt!: number;
}
