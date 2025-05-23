import { promises as fs } from 'fs';
import path from 'path';

type Schema = Record<string, 'string' | 'number' | 'boolean'>;
type Row = Record<string, any>;

export class RelationalDB {
  private baseDir = path.resolve('data');

  private getTablePath(name: string): string {
    return path.join(this.baseDir, `${name}.table.json`);
  }

  async createTable(name: string, schema: Schema): Promise<void> {
    const filePath = this.getTablePath(name);
    try {
      await fs.access(filePath);
      throw new Error(`Table "${name}" already exists.`);
    } catch {
      const table = { schema, rows: [] };
      await fs.writeFile(filePath, JSON.stringify(table, null, 2), 'utf-8');
    }
  }

  private async loadTable(name: string): Promise<{ schema: Schema, rows: Row[] }> {
    const filePath = this.getTablePath(name);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }

  private async saveTable(name: string, data: { schema: Schema, rows: Row[] }): Promise<void> {
    const filePath = this.getTablePath(name);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async insert(tableName: string, row: Row): Promise<void> {
    const table = await this.loadTable(tableName);
    for (const key in table.schema) {
      const expectedType = table.schema[key];
      const actualType = typeof row[key];
      if (actualType !== expectedType) {
        throw new Error(`Type mismatch for "${key}": expected ${expectedType}, got ${actualType}`);
      }
    }
    table.rows.push(row);
    await this.saveTable(tableName, table);
  }

  async select(tableName: string, filters?: Record<string, any>): Promise<Row[]> {
    const table = await this.loadTable(tableName);
    return table.rows.filter(row =>
      !filters || Object.entries(filters).every(([k, v]) => row[k] === v)
    );
  }

  async delete(tableName: string, filters?: Record<string, any>): Promise<number> {
    const table = await this.loadTable(tableName);
    const originalLength = table.rows.length;
    table.rows = table.rows.filter(row =>
      filters && !Object.entries(filters).every(([k, v]) => row[k] === v)
    );
    await this.saveTable(tableName, table);
    return originalLength - table.rows.length;
  }
}
