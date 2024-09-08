<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import MovieSuggestionCard from '$lib/components/MovieSuggestionCard.svelte';

	export let data: PageData;
	const { cast, directors, movie: movieData, suggestionRating, watchProviders } = data.props ?? {};

	onMount(() => {
		if (!movieData || !movieData.id) {
			goto('/');
		}
	});
</script>

{#if movieData && movieData.id && watchProviders !== undefined}
	<main>
		<div class="flex justify-center">
			<MovieSuggestionCard {cast} {directors} {movieData} {suggestionRating} {watchProviders} />
		</div>
	</main>
{/if}
