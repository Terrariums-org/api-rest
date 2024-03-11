declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORT: number;
    USERDB: string;
    PASSWORD: string;
    DATABASE: string;
  }
}
