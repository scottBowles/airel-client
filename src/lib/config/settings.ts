const isProd = import.meta.env.PROD;

const PROD_API_PATH = 'https://apirel.onrender.com/graphql/';
const DEV_API_PATH = 'http://127.0.0.1:8000/graphql/';

export const API_PATH = isProd ? PROD_API_PATH : DEV_API_PATH;
export const CACHE_MS = 5000;
