<script>
	import ListDetailCard from '$lib/components/ListDetailCard.svelte';
	import GiBroadsword from 'svelte-icons/gi/GiBroadsword.svelte';
	import GiCheckedShield from 'svelte-icons/gi/GiCheckedShield.svelte';
	import GiRoundBottomFlask from 'svelte-icons/gi/GiRoundBottomFlask.svelte';

	export let item;

	$: ({ id, name, description, thumbnailId, imageIds, weapon, armor, equipment } = item);
	$: href = `/items/${id}`;
</script>

<ListDetailCard {description} thumbnailId={thumbnailId || imageIds[0]}>
	<svelte:fragment slot="title">
		<a {href} sveltekit:prefetch class="name">{name}</a>
		{#if weapon}
			<span class="icon">
				<GiBroadsword />
			</span>
		{/if}
		{#if armor}
			<span class="icon">
				<GiCheckedShield />
			</span>
		{/if}
		{#if equipment}
			<span class="icon">
				<GiRoundBottomFlask />
			</span>
		{/if}
	</svelte:fragment>
</ListDetailCard>

<style>
	.name {
		margin-right: 0.25rem;
	}
	.icon {
		display: inline-block;
		height: 1em;
		width: 1em;
		color: #908149;
	}
</style>
