import * as migration_20260328_150528 from './20260328_150528';
import * as migration_20260330_142617 from './20260330_142617';

export const migrations = [
  {
    up: migration_20260328_150528.up,
    down: migration_20260328_150528.down,
    name: '20260328_150528',
  },
  {
    up: migration_20260330_142617.up,
    down: migration_20260330_142617.down,
    name: '20260330_142617'
  },
];
