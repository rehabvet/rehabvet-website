import * as migration_20260403_104507 from './20260403_104507';
import * as migration_20260403_145616_add_pages_collection from './20260403_145616_add_pages_collection';

export const migrations = [
  {
    up: migration_20260403_104507.up,
    down: migration_20260403_104507.down,
    name: '20260403_104507',
  },
  {
    up: migration_20260403_145616_add_pages_collection.up,
    down: migration_20260403_145616_add_pages_collection.down,
    name: '20260403_145616_add_pages_collection'
  },
];
