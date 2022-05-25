<script>
	import { Form, NumberInput } from '@kahi-ui/framework';

	export let armor;
	export let editing;
	export let form;
</script>

{#if editing && $form.armor}
	<Form.Label>AC Bonus</Form.Label>
	<NumberInput bind:value={$form.armor.acBonus} />
{:else}
	AC Bonus: {armor?.acBonus}
{/if}
