<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import MovieSuggestionCard from '$lib/components/MovieSuggestionCard.svelte';

	export let data: PageData;
	const { cast, directors, movie: movieData, watchProviders, writers } = data.props;

	onMount(() => {
		if (!movieData || !movieData.id) {
			goto('/');
		}
	});
</script>

{#if movieData && movieData.id}
	<main>
		<div class="flex justify-center">
			<MovieSuggestionCard {cast} {directors} {movieData} {watchProviders} />
		</div>
	</main>
{/if}
