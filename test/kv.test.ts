import { describe, it, expect, beforeEach } from 'vitest';
import { KeyValueStore } from '../src/kv/kvEngine';

const TEST_FILE = './data/test-kv.json';
const TABLE = 'testTable';

describe('KeyValueStore (with tables)', () => {
  let db: KeyValueStore;

  beforeEach(async () => {
    db = new KeyValueStore(TEST_FILE);
    await db.clear(); // this clears all tables
  });

  it('sets and gets a value in a table', async () => {
    await db.set(TABLE, 'foo', 'bar');
    const val = await db.get(TABLE, 'foo');
    expect(val).toBe('bar');
  });

  it('returns undefined for non-existing key in table', async () => {
    const val = await db.get(TABLE, 'doesNotExist');
    expect(val).toBeUndefined();
  });

  it('deletes a key from a table', async () => {
    await db.set(TABLE, 'temp', 123);
    await db.delete(TABLE, 'temp');
    const val = await db.get(TABLE, 'temp');
    expect(val).toBeUndefined();
  });

  it('lists all keys in a table', async () => {
    await db.set(TABLE, 'a', 1);
    await db.set(TABLE, 'b', 2);
    const keys = await db.keys(TABLE);
    expect(keys.sort()).toEqual(['a', 'b']);
  });

  it('clears all data in the database', async () => {
    await db.set(TABLE, 'one', 1);
    await db.clear();
    const keys = await db.keys(TABLE);
    expect(keys).toEqual([]);
  });

  it('persists data across instances with tables', async () => {
    await db.set(TABLE, 'persisted', 'yes');

    const newInstance = new KeyValueStore(TEST_FILE);
    const val = await newInstance.get(TABLE, 'persisted');
    expect(val).toBe('yes');
  });
});
