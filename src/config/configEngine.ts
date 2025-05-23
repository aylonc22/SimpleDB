import { promises as fs } from 'fs';

const CONFIG_PATH = './data/config.json';

export async function setDataBaseType(db:string =''):Promise<void>{
    try{
        await fs.writeFile(CONFIG_PATH,JSON.stringify({db:db}));
    }
    catch{
        console.log("Failed to set data base type");
    }
    
}

export async function  getDataBaseType():Promise<string>{
    try{
        const config = await fs.readFile(CONFIG_PATH,'utf-8').then(res=>JSON.parse(res));
        return  config.db;
    }
    catch{
        return '';
    }
}
