import { describe, it, expect, beforeEach } from 'vitest';

import fs from 'fs/promises';
import path from 'path';
import { RelationalDB } from '../src/relational/relational';

const TABLE_FILE = path.resolve('data/users.table.json');
const db = new RelationalDB();

describe('RelationalDB', () => {
  beforeEach(async () => {
    try {
      await fs.unlink(TABLE_FILE);
    } catch {}
    await db.createTable('users', {
      id: 'number',
      name: 'string',
      active: 'boolean',
    });
  });

  it('inserts and selects rows', async () => {
    await db.insert('users', { id: 1, name: 'Alice', active: true });
    await db.insert('users', { id: 2, name: 'Bob', active: false });

    const all = await db.select('users');
    expect(all).toHaveLength(2);

    const activeUsers = await db.select('users', { active: true });
    expect(activeUsers).toEqual([{ id: 1, name: 'Alice', active: true }]);
  });

  it('rejects invalid row types', async () => {
    await expect(() =>
      db.insert('users', { id: 'not a number', name: 'Fail', active: true })
    ).rejects.toThrow(/Type mismatch/);
  });

  it('deletes rows matching filter', async () => {
    await db.insert('users', { id: 1, name: 'Alice', active: true });
    await db.insert('users', { id: 2, name: 'Bob', active: false });

    const deleted = await db.delete('users', { name: 'Bob' });
    expect(deleted).toBe(1);

    const remaining = await db.select('users');
    expect(remaining).toHaveLength(1);
    expect(remaining[0].name).toBe('Alice');
  });

  it('deletes nothing if filter doesn’t match', async () => {
    await db.insert('users', { id: 1, name: 'Alice', active: true });

    const deleted = await db.delete('users', { name: 'NotExists' });
    expect(deleted).toBe(0);
  });
});
