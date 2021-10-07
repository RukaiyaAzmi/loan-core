export interface PGCredentials {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export abstract class BaseConnection {
  protected slaveCredentials: PGCredentials[];
  protected masterCredentials: PGCredentials;
  constructor(credentials: PGCredentials | PGCredentials[]) {
    if (Array.isArray(credentials)) {
      this.slaveCredentials = credentials;
    } else {
      this.masterCredentials = credentials;
    }
  }
  async connect(): Promise<any> {}
}
