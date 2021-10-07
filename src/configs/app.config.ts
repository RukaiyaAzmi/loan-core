import fs from "fs";
import path from "path";
import { PGCredentials } from "../db/base/base-connection.db";

const configPath = path.resolve(__dirname + "/../../appconfig.json");
export const appConf: any = JSON.parse(fs.readFileSync(configPath, "utf-8"));

export function getPort() {
  return Number(appConf.port) || 3000;
}

// @ts-ignore
export const getMasterDBCredentials: PGCredentials = appConf.master;

// @ts-ignore
export const getSlaveDBCredentials: PGCredentials[] = appConf.slaves;
