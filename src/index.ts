import { setDataBaseType } from "./config/configEngine";
import { DocumentStore } from "./document/document";
import { printHelp } from "./help";
import { KeyValueStore } from "./kv/kvEngine";
import { RelationalDB } from "./relational/relational";



const kv = new KeyValueStore();
const relational = new RelationalDB();
const document = new DocumentStore();

const [, , action, ...args] = process.argv;

switch(action){
  case 'use':
    if(args[0] === 'kv' || args[0] === 'relational' || args[0] === 'document'){
      setDataBaseType(args[0]);
    }
    else{
      console.log(`Usage: db use <type> || kv || relational || document`)
    }
    break;
  case 'help':
    printHelp();
    break;
  default:
    printHelp();
    break;
}