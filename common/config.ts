export namespace Config {
  enum Env {
    development = "development",
    production = "production",
    test = "test",
  }
  export const environment = process.env.NODE_ENV;
  export const isDev = environment === Env.development;
  export const isProd = environment === Env.production;

  export const domain = isDev ? "localhost" : process.env.NODE_HOST_DOMAIN;

  export const port = isDev ? 4000 : 80;

  export const host = `${domain}:${port}`;

  export const api = '/api';

  export const log = '/log';

  export const ws = '/ws';
}
