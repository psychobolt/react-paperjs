import spawn from 'cross-spawn';

import { projectList } from './project-list';

const spawnOptions = { stdio: 'inherit' };

const scopeRegex = /^@(.+\/)+/;

projectList.forEach(({ name, location }) => {
  spawn.sync('yarn', ['test', '--coverage', '--projects', location], spawnOptions);
  spawn.sync('codecov', ['--clear', `--flags=${name.replace(scopeRegex, '')}`, ...process.argv.slice(2)], spawnOptions);
});
