import { Type } from '@mikro-orm/core';
import * as lo from 'lodash-es';

export class htmlEscapedString extends Type<string, string> {
  convertToDatabaseValue(value: string) {
    return lo.escape(value);
  }

  convertToJSValue(value: string) {
    return lo.unescape(value);
  }
}

export class UnixTimestamp extends Type<Date, number> {
  convertToDatabaseValue(value: Date) {
    return Math.trunc(value.getTime() / 1000);
  }

  convertToJSValue(value: number) {
    return new Date(value * 1000);
  }
}

export class BooleanTransformer extends Type<boolean, number> {
  convertToDatabaseValue(value: boolean) {
    return value ? 1 : 0;
  }

  convertToJSValue(value: number) {
    return value === 1;
  }
}
