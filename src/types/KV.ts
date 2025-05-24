export type KVDatabase = {
    [tableName: string]: {
      [recordId: string]: {
        value: any;
        createdAt: string;
        updatedAt: string;
        expiresAt?: number;
      };
    };
  };