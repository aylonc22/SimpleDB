import fs  from 'fs';


const CONFIG_PATH = './data/config.json';

export async function setDataBaseType(db:string =''):Promise<void>{
    try{
        await fs.promises.writeFile(CONFIG_PATH,JSON.stringify({db:db}));
    }
    catch{
        console.log("Failed to set data base type");
    }
    
}

export function  getDataBaseType():string{
    try{
        const raw = fs.readFileSync(CONFIG_PATH,'utf8');
        const config =  JSON.parse(raw);
        return  config.db;
    }
    catch{
        return '';
    }
}
