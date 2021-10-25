const fs1 = require('fs');
const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

const configPath = path.resolve(__dirname + '/../appconfig.json');
const appConf = JSON.parse(fs1.readFileSync(configPath, 'utf-8'));
//console.log(appConf)

const pool = new Pool({
    user: appConf.database.master.user,
    host: appConf.database.master.host,
    database: appConf.database.master.database,
    password: appConf.database.master.password,
    port: appConf.database.master.port
})

async function lsDir(dir) {
    const files = [];
    const absPath = path.join(__dirname, dir);
    async function* generator(dirName) {
        const dirents = await fs.readdir(dirName, { withFileTypes: true });
        for (dirent of dirents) {
            let direntPath = path.resolve(dirName, dirent.name);
            if (dirent.isDirectory()) yield* generator(direntPath);
            else yield direntPath;
        }
    }
    for await (filePath of generator(absPath)){
        //console.log(path.extname(filePath))
        if(path.extname(filePath) === '.sql') files.push(filePath);
        else continue;
    } 
    return files;
}


(async function dbSync(dir) {
    const files = await lsDir(dir);
    for(f of files) {
        const sql = (await fs.readFile(f)).toString();
        //console.log(sql);
        await pool.query(sql);
    }
    pool.end();
    console.log('[INFO] Database init successful')
}('../entities'));