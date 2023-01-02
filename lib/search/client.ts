import type { OptionsInit } from 'got';
import { Options } from 'got';
import * as got from 'got';

export class WithHttpClient {
  protected readonly client: got.Got;

  constructor(baseUrl: string) {
    const opt: OptionsInit = { http2: true };

    this.client = got.create({
      options: new Options(baseUrl, opt),
      handlers: [],
      mutableDefaults: false,
    });
  }
}
