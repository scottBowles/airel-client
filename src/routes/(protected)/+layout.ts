import { MeStore } from '$houdini';

export const load = async (event) => {
	console.log('routes/(protected)/+layout.ts: load function 1');
	const MeQuery = new MeStore();
	console.log('routes/(protected)/+layout.ts: load function 2');
	const result = await MeQuery.fetch({ event });
	console.log('routes/(protected)/+layout.ts: load function 3');
	return { me: result.data?.me };
};
