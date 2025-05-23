import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { DocumentStore } from '../src/document/document';

const FILE = path.resolve('data/users.collection.json');
const db = new DocumentStore();

describe('DocumentStore', () => {
  beforeEach(async () => {
    try {
      await fs.unlink(FILE);
    } catch {}
  });

  it('inserts and finds documents', async () => {
    await db.insert('users', { id: 1, name: 'Alice', age: 30 });
    await db.insert('users', { id: 2, name: 'Bob', age: 25 });

    const all = await db.find('users');
    expect(all).toHaveLength(2);

    const filtered = await db.find('users', { age: 25 });
    expect(filtered).toEqual([{ id: 2, name: 'Bob', age: 25 }]);
  });

  it('returns empty array when no match found', async () => {
    await db.insert('users', { id: 1, name: 'Alice', age: 30 });
    const result = await db.find('users', { name: 'Charlie' });
    expect(result).toEqual([]);
  });

  it('deletes matching documents', async () => {
    await db.insert('users', { id: 1, name: 'Alice' });
    await db.insert('users', { id: 2, name: 'Bob' });

    const deleted = await db.delete('users', { name: 'Alice' });
    expect(deleted).toBe(1);

    const remaining = await db.find('users');
    expect(remaining).toEqual([{ id: 2, name: 'Bob' }]);
  });

  it('deletes all documents if no query provided', async () => {
    await db.insert('users', { id: 1, name: 'Alice' });
    await db.insert('users', { id: 2, name: 'Bob' });

    const deleted = await db.delete('users');
    expect(deleted).toBe(2);

    const remaining = await db.find('users');
    expect(remaining).toEqual([]);
  });
});
