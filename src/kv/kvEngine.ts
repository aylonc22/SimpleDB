import { promises as fs } from 'fs';
import path from 'path';
import { KVDatabase, KVTable } from '../types/KV';

export class KeyValueStore {
  private data:KVDatabase = {};
  private filePath: string;
  private loaded = false;

  constructor(filePath: string = './data/kv.json') {
    this.filePath = path.resolve(filePath);
  }

  private async load(): Promise<void> {
    if (this.loaded) return;

    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      this.data = JSON.parse(content);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
      this.data = {}
      await this.save(); // create empty file
    }

    this.loaded = true;
  }

  private async save(): Promise<void> {
    const content = JSON.stringify(this.data, null, 2);
    await fs.writeFile(this.filePath, content, 'utf-8');
  }


  public async set(table: string, key: string, value: any): Promise<void> {
    await this.load();
    const now = new Date().toISOString();
    this.data[table] ||= {}
    const existing = this.data[table][key];

    this.data[table][key] = {
      value,
      createdAt: existing?.createdAt || now,
      updatedAt: now
    };

    await this.save();
  }

  public async get(table:string, key: string): Promise<any | undefined> {
    await this.load();
    return this.data[table]?.[key]?.value;
  }

  public async delete(table:string, key: string): Promise<void> {
    await this.load();
    if(this.data[table]){
      delete this.data[table][key];
      if(Object.keys(this.data[table]).length === 0)
        delete this.data[table];
      
      await this.save();
    }
  }

  public async keys(table:string): Promise<string[]> {
    await this.load();
    return Object.keys(this.data[table] || []);
  }

  public async clear(table:string |undefined = undefined): Promise<void> {
    await this.load();
    if(table === undefined){
      this.data = {};
    }
    else{
      delete this.data[table];
    }

    await this.save();
  }

  public async tables():Promise<string[]>{
    await this.load();
    return Object.keys(this.data);
  }
}
