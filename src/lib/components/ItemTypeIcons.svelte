<svelte:options runes={true} />

<script lang="ts">
	import GiBroadsword from 'svelte-icons/gi/GiBroadsword.svelte';
	import GiCheckedShield from 'svelte-icons/gi/GiCheckedShield.svelte';
	import GiRoundBottomFlask from 'svelte-icons/gi/GiRoundBottomFlask.svelte';

	let { isWeapon = false, isArmor = false, isEquipment = false } = $props();
</script>

{#if isWeapon}
	<span class="icon">
		<GiBroadsword />
	</span>
{/if}
{#if isArmor}
	<span class="icon">
		<GiCheckedShield />
	</span>
{/if}
{#if isEquipment}
	<span class="icon">
		<GiRoundBottomFlask />
	</span>
{/if}

<style>
	.icon {
		display: inline-block;
		height: 1em;
		width: 1em;
		color: #908149;
	}
</style>
