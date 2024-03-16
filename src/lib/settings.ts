const mode = import.meta.env.MODE;

const development = {
	API_PATH: 'http://127.0.0.1:5173/endpoints/api/'
	// API_PATH: 'http://127.0.0.1:8000/graphql/'
};

const production = {
	API_PATH: 'https://apirel.onrender.com/endpoints/api/'
	// API_PATH: 'https://apirel.onrender.com/graphql/'
};

const base = {
	CACHE_MS: 5000
};

const environmentSpecificConfig = mode === 'development' ? development : production;

export default {
	...base,
	...environmentSpecificConfig
};
