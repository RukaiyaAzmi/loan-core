import { getSlaveDBCredentials } from "../../configs/app.config";
import { BaseConnection, PGCredentials } from "../base/base-connection.db";
import { Pool } from "pg";

class Slave extends BaseConnection {
  constructor(credentials: PGCredentials[]) {
    super(credentials);
  }
  async connect() {
    const pools: Pool[] = [];
    if (this.slaveCredentials) {
      this.slaveCredentials.forEach(async (credential, i) => {
        const pool = new Pool(credential);
        try {
          await pool.connect();
          console.log(`[INFO] connected to slaveDB ${i}`);
          pools.push(pool);
        } catch (error) {
          console.log(error);
        }
      });
    }
    return pools;
  }
}

export const slaveConnection = new Slave(getSlaveDBCredentials).connect();
