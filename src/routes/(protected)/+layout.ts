import { MeStore } from '$houdini';

export const load = async (event) => {
	const MeQuery = new MeStore();
	const result = await MeQuery.fetch({ event });
	return { me: result.data?.me };
};
