/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'http://127.0.0.1:8000/graphql/'
	},
	plugins: {
		'houdini-svelte': {}
	},
	scalars: {
		DateTime: {
			type: 'Date',
			unmarshal(value) {
				return new Date(value);
			},
			marshal(date) {
				return date.getTime();
			}
		},
		GlobalID: {
			type: 'string',
			unmarshal(value) {
				return value;
			},
			marshal(value) {
				return value;
			}
		}
	}
};

export default config;
