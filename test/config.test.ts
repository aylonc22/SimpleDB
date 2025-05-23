import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { getDataBaseType, setDataBaseType } from '../src/config/configEngine';


const CONFIG_PATH = path.resolve(__dirname, '../data/config.json');

describe('Database config', () => {
  beforeEach(async () => {
    // clean before test
    try {
      await fs.rm(CONFIG_PATH, { force: true });
    } catch {}
  });

  afterEach(async () => {
    // clean after test
    try {
        console.log(CONFIG_PATH);
      await fs.rm(CONFIG_PATH, { force: true });
    } catch(e) {console.log(e)};
  });

  it('should write and read database type correctly', async () => {
    await setDataBaseType('kv');
    const dbType = await getDataBaseType();
    expect(dbType).toBe('kv');
  });

  it('should return empty string if config file does not exist', async () => {
    const dbType = await getDataBaseType();
    expect(dbType).toBe('');
  });

  it('should handle invalid JSON gracefully', async () => {
    await fs.writeFile(CONFIG_PATH, 'invalid json');
    const dbType = await getDataBaseType();
    expect(dbType).toBe('');
  });
});
