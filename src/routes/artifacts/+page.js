import { browser } from '$app/env';
import fetchBanner from '$lib/fetchBanner';
import { KQL_Artifacts } from '$lib/graphql/_kitql/graphqlStores';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';

export async function load({ fetch }) {
	if (browser) {
		const [bannerUrl, _] = await Promise.all([
			fetchBanner({
				fetch,
				imageId: 'dnd/City_guard_and_magister-5e_uk2sr0',
				overlay: 'Artifacts',
				gravity: compass('north_east')
			}),
			KQL_Artifacts.queryLoad({ fetch })
		]);
		return { bannerUrl };
	} else {
		await KQL_Artifacts.queryLoad({ fetch });
		return {};
	}
}
