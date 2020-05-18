import path from 'path';
import spawn from 'cross-spawn';

spawn.sync('lerna', ['exec', '--', 'flow-typed', 'update', '-s', '-i', 'peer', '-p', path.resolve()], { stdio: 'inherit' });
