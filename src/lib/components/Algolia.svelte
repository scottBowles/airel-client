<script>
	import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
	import algoliasearch from 'algoliasearch/lite.js';

	import '@algolia/autocomplete-theme-classic';

	import { getThumbnailUrl } from '$lib/cloudinary';

	const ALGOLIA_APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID.toString();
	const ALGOLIA_SEARCH_ONLY_KEY = import.meta.env.VITE_ALGOLIA_SEARCH_ONLY_KEY.toString();

	export let placeholder = '';

	function algoliaInit(_node) {
		const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY);

		function makeSource({ indexName, getUrlFromId, query }) {
			return {
				sourceId: indexName,
				getItems() {
					return getAlgoliaResults({
						searchClient,
						queries: [
							{
								indexName: indexName,
								query,
								params: {
									hitsPerPage: 5,
									attributesToSnippet: ['description:5']
								}
							}
						]
					});
				},
				templates: {
					header() {
						return indexName;
					},
					item({ item, components, html }) {
						return html`<a href=${getUrlFromId(item.global_id)}>
							<div class="aa-ItemWrapper">
								<div class="aa-ItemContent">
									<div class="aa-ItemIcon aa-ItemIcon--alignTop">
										<img
											src="${getThumbnailUrl(item.thumbnail)}"
											alt="${item.name}"
											width="40"
											height="40"
										/>
									</div>
									<div class="aa-ItemContentBody">
										<div class="aa-ItemContentTitle">
											${components.Highlight({
												hit: item,
												attribute: 'name'
											})}
										</div>
										<div class="aa-ItemContentDescription">
											${components.Snippet({
												hit: item,
												attribute: 'description'
											})}
										</div>
									</div>
								</div>
							</div>
						</a>`;
					}
				},
				getItemUrl: ({ item }) => getUrlFromId(item.global_id)
			};
		}

		autocomplete({
			container: '#autocomplete',
			placeholder,
			getSources({ query }) {
				return [
					makeSource({
						indexName: 'Association',
						getUrlFromId: (id) => `/associations/${id}`,
						query
					}),
					makeSource({
						indexName: 'Artifact',
						getUrlFromId: (id) => `/artifacts/${id}`,
						query
					}),
					makeSource({
						indexName: 'Character',
						getUrlFromId: (id) => `/characters/${id}`,
						query
					}),
					makeSource({
						indexName: 'Item',
						getUrlFromId: (id) => `/items/${id}`,
						query
					}),
					makeSource({
						indexName: 'Place',
						getUrlFromId: (id) => `/places/${id}`,
						query
					}),
					makeSource({
						indexName: 'Race',
						getUrlFromId: (id) => `/races/${id}`,
						query
					})
				];
			}
		});

		const inputElement = document.querySelector('input.aa-Input');
		inputElement instanceof HTMLInputElement && inputElement.focus();
	}
</script>

<div id="autocomplete" use:algoliaInit />

<style>
	:global(.aa-Panel) {
		z-index: 99;
	}
</style>
