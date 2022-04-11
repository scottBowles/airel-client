<script>
	import { Editor, Viewer } from 'bytemd';
	import 'bytemd/dist/index.css';
	import gfm from '@bytemd/plugin-gfm';

	const plugins = [gfm()];
	export let value = '';
	let editMode = false;

	function toggleEditMode() {
		editMode = !editMode;
	}
</script>

<button on:click={toggleEditMode}>
	{editMode ? 'View' : 'Edit'}
</button>
{#if editMode}
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
	/* set .byte-md styles globally */
	:global(.byte-md) {
		height: 500px;
		width: auto;
	}
</style>
