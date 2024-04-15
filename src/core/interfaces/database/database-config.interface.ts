export type Env = {
  DB_NAME: string;
};

export interface DatabaseConfig {
  get<T extends object>();
}
