import fs from 'fs';
import path from 'path';
import { IAppDBCredentials } from '../db/connection.db';


const configPath = path.resolve(__dirname + '/../../appconfig.json');
export const appConf: any = JSON.parse(fs.readFileSync(configPath, 'utf-8'));


export function getPort() {
    return Number(appConf.port) || 3000;
}

export function getDB() : IAppDBCredentials {
    return appConf.database;
}

export function getAdminCreds() {
    return appConf.admin;
}

type jwtType = "dev" | "app" | "temp";
export function getJWTSecret(type: jwtType) {
    switch(type) {
        case "dev":
            return appConf.jwtSecretDev;
        case "app":
            return appConf.jwtSecretApp;
        case "temp":
            return appConf.jwtSecretTemp;
        default:
            return appConf.jwtSecretApp;
    }
}

