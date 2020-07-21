import fs from 'fs';
import path from 'path';
import { isMatch } from 'micromatch';
import { getPackagesSync } from '@lerna/project';

const ROOT_RESOLVE = path.resolve();

const PACKAGES = (process.env.PACKAGES || `${fs.readFileSync('.projectlist', 'utf8')}`).trim();

export const EXCLUDES = [];
export const INCLUDES = [];

if (PACKAGES) {
  Array.prototype.push.apply(INCLUDES, PACKAGES.split(/\s*(?:,|\n|\s)+\s*/).filter(pattern => {
    if (pattern.startsWith('!')) {
      EXCLUDES.push(pattern.substring(1));
      return false;
    }
    return true;
  }));
}

const match = (strings, pattern) => strings.some(string => isMatch(string, pattern));

export default getPackagesSync().filter(pkg => {
  const { name, location } = pkg;
  const strings = [name, location.replace(`${ROOT_RESOLVE}/`, '')];
  return INCLUDES.some(pattern => match(strings, pattern))
    && !EXCLUDES.some(pattern => match(strings, pattern));
});
