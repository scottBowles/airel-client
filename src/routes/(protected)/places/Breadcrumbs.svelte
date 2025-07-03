<svelte:options runes={true} />

<script lang="ts">
	import { fragment, graphql, type PlaceBreadcrumbFields } from '$houdini';

	let { place }: { place: PlaceBreadcrumbFields } = $props();

	let data = $derived(
		fragment(
			place,
			graphql(`
				fragment PlaceBreadcrumbFields on Place {
					id
					name
					parent {
						id
						name
						parent {
							id
							name
							parent {
								id
								name
								parent {
									id
									name
									parent {
										id
										name
										parent {
											id
											name
										}
									}
								}
							}
						}
					}
				}
			`)
		)
	);

	type BreadcrumbNode = { id: string; name: string; parent?: BreadcrumbNode | null };

	function getBreadcrumbs(node?: BreadcrumbNode | null): BreadcrumbNode[] {
		return node ? [...getBreadcrumbs(node.parent), node] : [];
	}
	let breadcrumbs = $derived(getBreadcrumbs($data));
</script>

{#if breadcrumbs.length > 0}
	<div class="container mx-auto mt-2">
		<div class="breadcrumbs text-sm">
			{#if breadcrumbs.length > 1}
				<ul>
					{#each breadcrumbs as breadcrumb, i (breadcrumb.id)}
						<li>
							{#if i === breadcrumbs.length - 1}
								{breadcrumb.name}
							{:else}
								<a href={`/places/${breadcrumb.id}`} class="text-accent">
									{breadcrumb.name}
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				&nbsp;
			{/if}
		</div>
	</div>
{/if}
