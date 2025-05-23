export function printHelp() {
    console.log(`
  SimpleDB CLI Usage:
  
    Usage: cli.ts <engine> <command> [arguments]
  
    Engines:
      kv          Key-Value store
      relational  Relational database
      document    Document store
  
    Commands for kv:
      set <key> <value>         Set a key-value pair
      get <key>                 Get value by key
      delete <key>              Delete a key
  
    Commands for relational:
      create-table <table> <schema_json>   Create table with JSON schema
      insert <table> <record_json>          Insert a record as JSON
      select <table> [query_json]           Query records (optional JSON filter)
      delete <table> [query_json]           Delete records matching filter
  
    Commands for document:
      insert <collection> <document_json>  Insert a document as JSON
      find <collection> [query_json]       Find documents matching JSON filter
      delete <collection> [query_json]     Delete documents matching filter
  
  Examples:
  
    ./cli.ts kv set foo bar
    ./cli.ts kv get foo
    ./cli.ts relational create-table users '{"id":"number","name":"string"}'
    ./cli.ts document insert users '{"name":"Alice","age":30}'
  
  Note: JSON arguments must be enclosed in single quotes to avoid shell issues.
  
  `);
  }
  