<script lang="ts">
	import { dateAdjustedForUtcOffset, fromGlobalId } from '$lib/utils';
	import FaCaretDown from 'svelte-icons/fa/FaCaretDown.svelte';
	import FaExternalLinkAlt from 'svelte-icons/fa/FaExternalLinkAlt.svelte';
	import type { ValueOf } from 'houdini';

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

<li class="mb-8">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<article tabindex="0" class={`collapse group`}>
		<div class="card w-full bg-base-200 group-focus:bg-base-300 text-base-content shadow-xl">
			<div class="card-body collapse-title">
				<div class="md:flex justify-between gap-4">
					<h2 class="card-title mb-2">
						<span>
							<a href={detailUrl} class="hover:text-accent">{log.title}</a>
							<a href={log.url} target="_blank" rel="noopener noreferrer" class="ml-2">
								<span class="icon inline-block hover:text-accent"><FaExternalLinkAlt /></span>
							</a>
						</span>
					</h2>
					<h6 class="card-subtitle whitespace-nowrap">
						{fmtDate(log.gameDate)}
					</h6>
				</div>
				<p>{log.brief || '(brief tbd)'}</p>
			</div>
			<div class="collapse-content">
				{log.synopsis || '(synopsis tbd)'}
			</div>
			<div class="w-full text-center">
				<span class="icon group-focus:hidden"><FaCaretDown /></span>
			</div>
		</div>
	</article>
</li>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}
	.inputContainer {
		display: flex;
		align-items: baseline;
		margin-bottom: 1rem;
	}
</style>
