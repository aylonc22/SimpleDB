export type KVRecord = {    
        value: any;
        createdAt: string;
        updatedAt: string;             
  };

export type KVTable = Record<string,KVRecord>;

export type KVDatabase = Record<string,KVTable>