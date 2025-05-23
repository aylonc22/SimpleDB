import { describe, it, expect, beforeEach } from 'vitest';
import { KeyValueStore } from '../src/kv/kvEngine';

const TEST_FILE = './data/test-kv.json';

describe('KeyValueStore', () => {
  let db: KeyValueStore;

  beforeEach(async () => {
    db = new KeyValueStore(TEST_FILE);
    await db.clear();
  });

  it('sets and gets a value', async () => {
    await db.set('foo', 'bar');
    const val = await db.get('foo');
    expect(val).toBe('bar');
  });

  it('returns undefined for non-existing key', async () => {
    const val = await db.get('doesNotExist');
    expect(val).toBeUndefined();
  });

  it('deletes a key', async () => {
    await db.set('temp', 123);
    await db.delete('temp');
    const val = await db.get('temp');
    expect(val).toBeUndefined();
  });

  it('lists all keys', async () => {
    await db.set('a', 1);
    await db.set('b', 2);
    const keys = await db.keys();
    expect(keys.sort()).toEqual(['a', 'b']);
  });

  it('clears all data', async () => {
    await db.set('one', 1);
    await db.clear();
    const keys = await db.keys();
    expect(keys).toEqual([]);
  });

  it('persists data across instances', async () => {
    await db.set('persisted', 'yes');

    const newInstance = new KeyValueStore(TEST_FILE);
    const val = await newInstance.get('persisted');
    expect(val).toBe('yes');
  });
});
