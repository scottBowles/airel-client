<script lang="ts">
	import { parseFormData } from 'parse-nested-form-data';
	import { fragment, graphql, UnlockStore, UpdateLogStore, type LogEditFields } from '$houdini';
	import FaSave from 'svelte-icons/fa/FaSave.svelte';
	import FaUndoAlt from 'svelte-icons/fa/FaUndoAlt.svelte';
	import RelatedPlaceMultiSelect from '$lib/components/RelatedPlaceMultiSelect.svelte';
	import RelatedItemMultiSelect from '$lib/components/RelatedItemMultiSelect.svelte';
	import RelatedRaceMultiSelect from '$lib/components/RelatedRaceMultiSelect.svelte';
	import RelatedAssociationMultiSelect from '$lib/components/RelatedAssociationMultiSelect.svelte';
	import RelatedCharacterMultiSelect from '$lib/components/RelatedCharacterMultiSelect.svelte';
	import RelatedArtifactMultiSelect from '$lib/components/RelatedArtifactMultiSelect.svelte';

	const unlockMutation = new UnlockStore();
	const updateLog = new UpdateLogStore();

	export let log: LogEditFields;

	$: data = fragment(
		log,
		graphql(`
			fragment LogEditFields on GameLog {
				id
				title
				gameDate
				brief
				synopsis
				lockUser {
					username
				}
				placesSetIn {
					edges {
						node {
							id
						}
					}
				}
			}
		`)
	);

	$: ({ id, title, gameDate, brief, synopsis, placesSetIn, lockUser } = $data);
	$: initialPlaceIds = placesSetIn.edges.map((edge) => edge.node.id);

	const unlock = () => unlockMutation.mutate({ id });

	const handleSubmit = async (event: Event) => {
		const data = new FormData(event.target as HTMLFormElement);
		const parsed = parseFormData(data);
		const gameDate = parsed.gameDate ? new Date(parsed.gameDate as string) : null;

		console.log({ parsed });
		updateLog.mutate({ id, ...parsed, gameDate });
	};

	const modalId = `discard-changes-modal-${id}`;
</script>

<div class="container mx-auto mt-8 mb-32 px-8">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-3xl font-bold">Edit Log</h1>

		<div class="flex items-center gap-8 min-w-fit">
			<span>Locked by {lockUser?.username ?? 'Unknown'}</span>

			<label for={modalId} class="btn btn-ghost btn-sm icon-btn modal-button"
				><div class="tooltip" data-tip="Discard changes">
					<span class="icon"><FaUndoAlt /></span>
				</div></label
			>
			<input type="checkbox" id={modalId} class="modal-toggle" />
			<label for={modalId} class="modal modal-bottom sm:modal-middle cursor-pointer">
				<label class="modal-box relative" for="">
					<h3 class="font-bold text-lg">Discard changes</h3>
					<p class="py-4">Are you sure you want to discard any unsaved changes?</p>
					<div class="modal-action">
						<label for={modalId} class="btn" on:click={unlock} on:keypress={unlock}>Yes</label>
						<label for={modalId} class="btn">No</label>
					</div>
				</label>
			</label>

			<button type="submit" class="btn btn-ghost btn-sm icon-btn"
				><div class="tooltip" data-tip="Save"><span class="icon"><FaSave /></span></div></button
			>
		</div>
	</div>
	<hr class="mb-8" />

	<form
		method="POST"
		on:submit|preventDefault={handleSubmit}
		class="flex flex-col sm:flex-row gap-16"
	>
		<div class="flex flex-col gap-2">
			<h2 class="text-xl font-bold my-4">Details</h2>

			<div class="form-control">
				<label for="title-input" class="label">
					<span class="label-text">Title</span>
				</label>
				<input
					type="text"
					id="title-input"
					name="title"
					value={title}
					class="input input-bordered w-full max-w-sm"
					required
				/>
			</div>
			<div class="form-control">
				<label for="game-date" class="label">
					<span class="label-text">Game Date</span>
				</label>
				<input
					type="date"
					id="game-date"
					name="gameDate"
					value={gameDate?.toISOString().substring(0, 10) ?? ''}
					class="input input-bordered w-full max-w-sm"
					required
				/>
			</div>
			<div class="form-control">
				<label for="brief" class="label">
					<span class="label-text">Brief</span>
				</label>
				<textarea
					id="brief"
					name="brief"
					class="textarea textarea-bordered w-full"
					value={brief}
					required
				/>
			</div>
			<div class="form-control">
				<label for="synopsis" class="label">
					<span class="label-text">Synopsis</span>
				</label>
				<textarea
					id="synopsis"
					name="synopsis"
					class="textarea textarea-bordered w-full"
					value={synopsis}
					required
				/>
			</div>
			<div class="max-w-xs">
				<RelatedPlaceMultiSelect
					id={`log-${id}-place-select`}
					name="placesSetIn"
					displayName="Places Set In"
					{initialPlaceIds}
				/>
			</div>
		</div>

		<div class="flex flex-col items-center">
			<h2 class="text-xl font-bold my-4">Found in this Log</h2>

			<div class="flex flex-col gap-2 w-full">
				<RelatedCharacterMultiSelect />
				<RelatedItemMultiSelect />
				<RelatedArtifactMultiSelect />
				<RelatedPlaceMultiSelect />
				<RelatedAssociationMultiSelect />
				<RelatedRaceMultiSelect />
			</div>
		</div>
	</form>
</div>

<style>
	.icon {
		display: inline-block;
		height: 16px;
		width: 16px;
	}

	.icon-btn:hover {
		color: #908149;
	}

	.tooltip {
		text-transform: none;
	}
</style>
