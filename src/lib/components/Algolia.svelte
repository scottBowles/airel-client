<script>
	import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
	import algoliasearch from 'algoliasearch/lite';

	import '@algolia/autocomplete-theme-classic';

	import { getThumbnailUrl } from '$lib/cloudinary';

	import { onMount } from 'svelte';

	export let placeholder = '';

	function algoliaInit() {
		const searchClient = algoliasearch('BV34Z34BB6', 'e0a30ac7c279eae51cf9853eb0ba05b9');

		function makeSource({ indexName, getItemUrl, query }) {
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
						return html`<div class="aa-ItemWrapper">
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
						</div>`;
					}
				},
				getItemUrl
			};
		}

		const autoCompleteState = autocomplete({
			container: '#autocomplete',
			placeholder,
			getSources({ query }) {
				return [
					makeSource({
						indexName: 'Association',
						getItemUrl: ({ item }) => `/associations/${item.global_id}`,
						query
					}),
					makeSource({
						indexName: 'Artifact',
						getItemUrl: ({ item }) => `/artifacts/${item.global_id}`,
						query
					}),
					makeSource({
						indexName: 'Character',
						getItemUrl: ({ item }) => `/characters/${item.global_id}`,
						query
					}),
					makeSource({
						indexName: 'Item',
						getItemUrl: ({ item }) => `/items/${item.global_id}`,
						query
					}),
					makeSource({
						indexName: 'Place',
						getItemUrl: ({ item }) => `/places/${item.global_id}`,
						query
					}),
					makeSource({
						indexName: 'Race',
						getItemUrl: ({ item }) => `/races/${item.global_id}`,
						query
					})
				];
			}
		});
		console.log({ autoCompleteState });
	}

	onMount(() => {
		algoliaInit();
		const inputElement = document.querySelector('input.aa-Input');
		inputElement instanceof HTMLInputElement && inputElement.focus();
	});
</script>

<div id="autocomplete" />
