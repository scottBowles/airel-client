<script>
	import { Form, NumberInput } from '@kahi-ui/framework';

	export let weapon;
	export let editing;
	export let form;
</script>

{#if editing && $form.weapon}
	<Form.Label>Attack Bonus</Form.Label>
	<NumberInput bind:value={$form.weapon.attackBonus} />
{:else}
	Attack Bonus: {weapon?.attackBonus}
{/if}
