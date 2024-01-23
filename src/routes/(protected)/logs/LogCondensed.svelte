<script lang="ts">
	import { dateAdjustedForUtcOffset, fromGlobalId } from '$lib/utils';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';
	import type { ValueOf } from '$houdini';

	export let log: {
		readonly id: string;
		readonly url: string;
		readonly title: string | null;
		readonly googleId: string | null;
		readonly gameDate: Date | null;
		readonly brief: string | null;
		readonly synopsis: string | null;
		readonly placesSetIn:
			| {
					readonly edges: {
						readonly node: {
							readonly name: string;
							readonly description: string | null;
							readonly placeType: ValueOf<{
								readonly DISTRICT: 'DISTRICT';
								readonly LOCATION: 'LOCATION';
								readonly MOON: 'MOON';
								readonly PLANET: 'PLANET';
								readonly REGION: 'REGION';
								readonly STAR: 'STAR';
								readonly TOWN: 'TOWN';
							}> | null;
						};
					}[];
			  }
			| undefined;
	};

	let expanded = false;

	$: id = fromGlobalId(log.id).id;
	$: detailUrl = `/logs/${id}`;

	function fmtDate(date: Date | null) {
		return date
			? dateAdjustedForUtcOffset(new Date(date)).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric'
			  })
			: '(date unknown)';
	}
</script>

{#if expanded}
	<li class="w-full text-base-content flex">
		<div class="w-full text-base-content mb-3">
			<div>
				<div class="md:flex justify-between gap-4">
					<h2 class="mb-2 font-bold flex align-start">
						<div
							class="mr-3 w-2 text-xl cursor-pointer"
							on:click={() => (expanded = false)}
							on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (expanded = false)}
						>
							&ndash;
						</div>
						<a href={detailUrl} class="hover:text-accent mt-1">{log.title}</a>
						<a href={log.url} target="_blank" rel="noopener noreferrer" class="ml-2 mt-1">
							<span class="icon inline-block hover:text-accent"><FaExternalLinkAlt /></span>
						</a>
					</h2>
					<h6 class="card-subtitle whitespace-nowrap">
						{fmtDate(log.gameDate)}
					</h6>
				</div>
				<p class="text-sm">{log.brief || '(brief tbd)'}</p>
			</div>
			<div>
				<!-- {log.synopsis || '(synopsis tbd)'} -->
			</div>
		</div>
	</li>
{:else}
	<li class="w-full text-base-content flex">
		<div
			class="mr-3 w-2 cursor-pointer"
			on:click={() => (expanded = true)}
			on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (expanded = true)}
		>
			&plus;
		</div>

		<div class="md:flex justify-between gap-4">
			<h2>
				<span>
					<a href={detailUrl} class="hover:text-accent">{log.title}</a>
				</span>
			</h2>
		</div>
	</li>
{/if}

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
</style>
