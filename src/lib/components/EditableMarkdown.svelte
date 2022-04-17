<script lang="ts">
	import { Editor, Viewer } from 'bytemd';
	import 'bytemd/dist/index.css';
	// import gfm from '@bytemd/plugin-gfm';

	// const plugins = [gfm()];
	const plugins = [];
	export let value = '';
	export let isLockedByAnotherUser = false;
	export let onSave: (value: string) => void;
	export let onEditClick: () => void;

	let editing = false;

	async function handleEditClick() {
		console.log('handleEditClick');
		try {
			await onEditClick();
			editing = true;
		} catch (e) {
			console.error(e);
		}
	}

	async function handleSave() {
		try {
			await onSave(value);
			editing = false;
		} catch (e) {
			console.error(e);
		}
	}
</script>

{#if editing}
	<button on:click={handleSave}>Save Changes</button>
{:else}
	<button disabled={isLockedByAnotherUser} on:click={handleEditClick}>Edit me pls</button>
{/if}

{#if editing}
	<Editor
		locale="en.json"
		maxLength={10000}
		placeholder="Start typing!"
		{plugins}
		{value}
		on:change={(e) => {
			value = e.detail.value;
		}}
	/>
{:else}
	<Viewer {value} />
{/if}

<style>
	:global(.byte-md) {
		height: 500px;
		width: auto;
	}
</style>
