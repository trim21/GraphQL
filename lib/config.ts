import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import { logger } from './logger';

export const production = process.env.NODE_ENV === 'production';
if (production) {
  logger.info('running in production');
}

export const projectRoot = url.fileURLToPath(new URL('..', import.meta.url));
export const pkg = JSON.parse(fs.readFileSync(path.resolve(projectRoot, 'package.json'), 'utf8'));
