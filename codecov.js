import spawn from 'cross-spawn';

import projectList from './project-list';

const spawnOptions = { stdio: 'inherit' };

projectList.forEach(({ name, location }) => {
  spawn.sync('yarn', ['test', '--coverage', '--projects', location], spawnOptions);
  spawn.sync('codecov', ['--clear', '--flags', name], spawnOptions);
});
