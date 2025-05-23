import { promises as fs } from 'fs';
import path from 'path';

export class KeyValueStore {
  private data: Record<string, any> = {};
  private filePath: string;
  private loaded = false;

  constructor(filePath: string) {
    this.filePath = path.resolve(filePath);
  }

  private async load(): Promise<void> {
    if (this.loaded) return;

    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      this.data = JSON.parse(content);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
      await this.save(); // create empty file
    }

    this.loaded = true;
  }

  private async save(): Promise<void> {
    const content = JSON.stringify(this.data, null, 2);
    await fs.writeFile(this.filePath, content, 'utf-8');
  }

  public async set(key: string, value: any): Promise<void> {
    await this.load();
    this.data[key] = value;
    await this.save();
  }

  public async get(key: string): Promise<any | undefined> {
    await this.load();
    return this.data[key];
  }

  public async delete(key: string): Promise<void> {
    await this.load();
    delete this.data[key];
    await this.save();
  }

  public async keys(): Promise<string[]> {
    await this.load();
    return Object.keys(this.data);
  }

  public async clear(): Promise<void> {
    await this.load();
    this.data = {};
    await this.save();
  }
}
