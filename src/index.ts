import { KeyValueStore } from './kv/kvEngine'

const db = new KeyValueStore('./data/kv.json');

async function main() {
  await db.set('language', 'TypeScript');
  console.log(await db.get('language')); // "TypeScript"
  await db.delete('language');
  console.log(await db.get('language')); // undefined
  await db.set('x', 42);
  await db.set('y', true);
  console.log(await db.keys()); // ['x', 'y']
  await db.clear();
  console.log(await db.keys()); // []
}

main();
