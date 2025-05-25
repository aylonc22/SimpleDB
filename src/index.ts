import { getDataBaseType, setDataBaseType } from "./config/configEngine";
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
    if(args[0].toLocaleLowerCase() === 'kv' || args[0].toLocaleLowerCase() === 'relational' || args[0].toLocaleLowerCase() === 'document'){
      setDataBaseType(args[0].toLocaleLowerCase());
    }
    else{
      console.log(`Usage: db use <type>  kv || relational || document`);
    }
    break;
  case 'set':
    switch ( getDataBaseType()) {
      case 'kv':
        if(args[1] && args[2] && args[3]){
          kv.set(args[1],args[2],args[3]);
          console.log(`Inserted: ${args[3]}  to Table:${args[1]} at Key: ${args[2]}`);
        }
          else{
            console.log(`Usage: db set <Table> <Key> <Value>`);
          }    
        break;         
    }
    break;
  case 'find':
    switch ( getDataBaseType() ) {
      case 'kv':
        if(args[1] && args[2]){          
          console.log(`${kv.get(args[1],args[2])}`);
        }
          else{
            console.log(`Usage: db find <Table> <Key>`);
          }    
        break;          
    }
    break;
  case 'delete':
    switch ( getDataBaseType() ) {
      case 'kv':
        if(args[1] && args[2]){
          kv.delete(args[1],args[2]);         
          console.log(`Deleted ${args[2]} from Table: ${args[1]}`);
        }
          else{
            console.log(`Usage: db delete <Table> <Key>`);
          }    
        break;          
      }
      break;
  case 'clear':
      switch ( getDataBaseType() ) {
        case 'kv':
          if(args[1]){
            kv.clear(args[1]);         
            console.log(`Cleared Table: ${args[1]}`);
          }
          else{
            kv.clear();
            console.log(`Cleared Database`);
          }    
        break;          
      }
      break;
  case 'keys':
      switch ( getDataBaseType() ) {
        case 'kv':
          if(args[1]){                    
            console.log(`Table: ${args[1]}, Keys: ${kv.keys(args[1])}`);
          }
          else{
            console.log(`Usage: keys <Table>`);
          }    
          break;          
      }
      break;
  case 'tables':
      switch ( getDataBaseType() ) {
        case 'kv':                              
          console.log(`Tables: ${kv.tables()}`);         
          break;          
      }
      break;
  case 'help':
    printHelp();
    break;
  default:
    printHelp();
    break;
}