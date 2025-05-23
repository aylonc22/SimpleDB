# SimpleDB

A minimalist database engine written in TypeScript. SimpleDB supports:

- 🗝️ Key-Value Store (like Redis)
- 🧮 Relational Tables (like SQLite)
- 📄 Document Collections (like MongoDB)
- 💾 Local disk persistence

> Built for learning and experimentation. Not meant for production use.

---

## 🧱 Architecture

```
simpleDB/
├── src/
│ ├── core/ # File I/O, utilities
│ ├── kv/ # Key-Value store engine
│ ├── relational/ # Relational table engine
│ ├── document/ # Document store engine
│ ├── types/ # Shared types/interfaces
│ └── index.ts # Entry point / REPL
├── data/ # Local persisted storage
└── tests/ # Unit tests
```

---

## 🚀 Getting Started

### 1. Clone the repo

```
git clone https://github.com/aylonc22/simpleDB.git
cd simpleDB
```
2. Install dependencies
```
npm install
```
3. Run the project
```
npm run dev
```
Or to build:

```
npm run build
```
##🧪 Example Usage
Key-Value Store
```
import { KeyValueStore } from './src/kv/kvEngine'

const db = new KeyValueStore('./data/kv.json');
await db.set('foo', 'bar');
console.log(await db.get('foo')); // "bar"
```
Relational
```
import { RelationalDB } from './src/relational/relationalEngine'

const db = new RelationalDB('./data/relational.json');
db.createTable('users', { id: 'number', name: 'string' });
db.insert('users', { id: 1, name: 'Alice' });
console.log(db.select('users'));
```
Document Store
```
import { DocumentDB } from './src/document/documentEngine'

const db = new DocumentDB('./data/docs.json');
db.insert('posts', { title: 'Hello', body: 'World' });
console.log(db.find('posts', { title: 'Hello' }));
```
## 🛠 Features
File-based persistence using JSON

Schema enforcement for relational mode

Basic querying and filtering

Clean modular structure

Easy to extend or refactor

## 🧰 Tech Stack
TypeScript

Node.js (File System API)

Vitest (for testing)
