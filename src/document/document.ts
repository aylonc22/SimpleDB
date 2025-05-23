import { promises as fs } from 'fs';
import path from 'path';

type Document = Record<string, any>;

export class DocumentStore {
  private baseDir = path.resolve('data');

  private getCollectionPath(name: string): string {
    return path.join(this.baseDir, `${name}.collection.json`);
  }

  private async loadCollection(name: string): Promise<Document[]> {
    const filePath = this.getCollectionPath(name);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  private async saveCollection(name: string, docs: Document[]): Promise<void> {
    const filePath = this.getCollectionPath(name);
    await fs.writeFile(filePath, JSON.stringify(docs, null, 2), 'utf-8');
  }

  async insert(collection: string, doc: Document): Promise<void> {
    const docs = await this.loadCollection(collection);
    docs.push(doc);
    await this.saveCollection(collection, docs);
  }

  async find(collection: string, query?: Document): Promise<Document[]> {
    const docs = await this.loadCollection(collection);
    if (!query) return docs;

    return docs.filter(doc =>
      Object.entries(query).every(([key, value]) => doc[key] === value)
    );
  }

  async delete(collection: string, query?: Document): Promise<number> {
    const docs = await this.loadCollection(collection);
    const originalLength = docs.length;

    const remaining = query
      ? docs.filter(doc =>
          !Object.entries(query).every(([key, value]) => doc[key] === value)
        )
      : [];

    await this.saveCollection(collection, remaining);
    return originalLength - remaining.length;
  }
}
