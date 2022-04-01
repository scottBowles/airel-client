import { GFetch } from '@leveluptuts/g-query';

const isProd = import.meta.env.PROD;
const PROD_PATH = 'https://apirel.onrender.com/graphql/';
const DEV_PATH = 'http://127.0.0.1:8000/graphql/';
const path = isProd ? PROD_PATH : DEV_PATH;

export const g = new GFetch({ path });
