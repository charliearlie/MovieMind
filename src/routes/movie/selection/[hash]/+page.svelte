<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import MovieSuggestionCard from '$lib/components/MovieSuggestionCard.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	$: ({ props } = $page.data);

	onMount(() => {
		if (!props?.movie || !props.movie.id) {
			goto('/');
		}
	});
</script>

{#if props?.movie && props.movie.id && props.watchProviders !== undefined}
	<main>
		<div class="flex justify-center">
			<MovieSuggestionCard
				activePrompt={props.activePrompt}
				cast={props.cast}
				directors={props.directors}
				movieData={props.movie}
				suggestionRating={props.suggestionRating}
				watchProviders={props.watchProviders}
			/>
		</div>
	</main>
{/if}
