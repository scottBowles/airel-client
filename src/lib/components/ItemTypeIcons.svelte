<svelte:options runes={true} />

<script lang="ts">
	let { isWeapon = false, isArmor = false, isEquipment = false } = $props();
</script>

{#if isWeapon}
	<span class="icon icon-[game-icons--broadsword]"> </span>
{/if}
{#if isArmor}
	<span class="icon icon-[game-icons--checked-shield]"> </span>
{/if}
{#if isEquipment}
	<span class="icon icon-[game-icons--round-bottom-flask]"> </span>
{/if}

<style>
	.icon {
		display: inline-block;
		height: 1em;
		width: 1em;
		color: #908149;
	}
</style>
