import { BaseConnection, PGCredentials } from "../base/base-connection.db";
import { Pool } from "pg";
import { getMasterDBCredentials } from "../../configs/app.config";

class Master extends BaseConnection {
  constructor(credentials: PGCredentials) {
    super(credentials);
  }
  async connect() {
    const pool = new Pool({ ...this.masterCredentials });
    try {
      await pool.connect();
      console.log("[INFO] connected to masterDB");
    } catch (error) {
      console.log(error);
    }
    return pool;
  }
}

export const masterConnection = new Master(getMasterDBCredentials).connect();
