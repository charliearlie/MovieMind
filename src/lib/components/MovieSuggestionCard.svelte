<script lang="ts">
	import { Card } from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { RefreshCcw } from 'lucide-svelte';
	import type { TmdbMovieDetails } from '$lib/types';
	import { getFormattedMovieDuration } from '$lib/utils';

	export let movieData: TmdbMovieDetails;
	export let onReroll: () => void;
	export let submitting: boolean;
</script>

<Card>
	<img
		class="w-full h-60 object-cover object-top rounded-t-md"
		src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
		alt={movieData.title}
	/>
	<div class="p-4 flex flex-col md:flex-row md:items-start items-center gap-4">
		<div class="-mt-24">
			<Card class="outline outline-1 outline-slate-300">
				<img
					class="md:w-64 h-64 md:h-96 rounded-md outline outline-1 outline-primary-foreground"
					src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
					alt={movieData.title}
				/>
			</Card>
		</div>
		<div class="flex flex-col flex-grow items-center text-center md:text-start md:items-start">
			<div class="flex-grow">
				<h3 class="text-2xl font-bold">{movieData.title}</h3>
				<p class="text-lg font-semibold">{new Date(movieData.release_date).getFullYear()}</p>
				<p class="font-light mt-2">Runtime: {getFormattedMovieDuration(movieData.runtime)}</p>
				{#if movieData.genres && movieData.genres.length > 0}
					<div class="flex flex-wrap gap-2 mt-2">
						{#each movieData.genres as genre}
							<Badge variant="secondary">{genre.name}</Badge>
						{/each}
					</div>
				{/if}
			</div>
			<div class="flex gap-2 mt-12 w-full justify-center md:justify-start">
				<Button href={`/movie/${movieData.id}`} class="flex-grow md:flex-grow-0"
					>Find a place to watch</Button
				>
				<Button
					variant="secondary"
					class="flex gap-2 text-lg flex-grow md:flex-grow-0"
					on:click={onReroll}
					disabled={submitting}
				>
					<RefreshCcw /> <span class="hidden md:inline">Reroll</span>
				</Button>
			</div>
		</div>
	</div>
</Card>
