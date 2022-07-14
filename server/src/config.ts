enum Env {
    dev = "dev",
    prod = "prod",
    test = "test"
}

export const isDev = process.env.NODE_ENV === Env.dev;
export const isProd = process.env.NODE_ENV === Env.prod;