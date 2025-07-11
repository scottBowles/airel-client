/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'env:PUBLIC_GRAPHQL_URL',
		interval: 0
	},
	runtimeDir: '.houdini',
	plugins: { 'houdini-svelte': { forceRunesMode: true } },
	scalars: {
		DateTime: {
			type: 'Date',
			unmarshal(value) {
				return new Date(value);
			},
			marshal(date) {
				return date;
			}
		}
	}
};

export default config;
