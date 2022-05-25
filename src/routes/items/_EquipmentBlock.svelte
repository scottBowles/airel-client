<script>
	import { TextInput } from '@kahi-ui/framework';

	export let equipment;
	export let editing;
	export let form;
</script>

{#if editing && $form.equipment}
	<TextInput
		bind:value={$form.equipment.briefDescription}
		placeholder="Brief description"
		is="textarea"
	/>
{:else}
	{equipment?.briefDescription}
{/if}
