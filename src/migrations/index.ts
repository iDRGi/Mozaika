import * as migration_20260328_150528 from './20260328_150528';

export const migrations = [
  {
    up: migration_20260328_150528.up,
    down: migration_20260328_150528.down,
    name: '20260328_150528'
  },
];
