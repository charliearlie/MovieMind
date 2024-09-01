<script lang="ts">
	import { Card } from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { RefreshCcw } from 'lucide-svelte';
	import type { TmdbMovieDetails, WatchProviders } from '$lib/types';
	import { getFormattedMovieDuration } from '$lib/utils';
	import WatchProvidersSection from './WatchProviders.svelte';

	export let movieData: TmdbMovieDetails;
	export let onReroll: () => void;
	export let submitting: boolean;
	export let watchProviders: WatchProviders | null;
</script>

<Card>
	<img
		class="h-60 w-full rounded-t-md object-cover object-top"
		src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
		alt={movieData.title}
	/>
	<div class="flex flex-col items-center gap-4 p-4 md:flex-row md:items-start">
		<div class="-mt-24">
			<Card class="outline outline-1 outline-slate-300">
				<img
					class="h-64 rounded-md outline outline-1 outline-primary-foreground md:h-96 md:w-64"
					src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
					alt={movieData.title}
				/>
			</Card>
		</div>
		<div class="flex flex-grow flex-col items-center text-center md:items-start md:text-start">
			<div class="flex-grow">
				<h3 class="text-2xl font-bold">{movieData.title}</h3>
				<p class="text-lg font-semibold">{new Date(movieData.release_date).getFullYear()}</p>
				<p class="mt-2 font-light">Runtime: {getFormattedMovieDuration(movieData.runtime)}</p>
				{#if movieData.genres && movieData.genres.length > 0}
					<div class="mt-2 flex flex-wrap gap-2">
						{#each movieData.genres as genre}
							<Badge variant="secondary">{genre.name}</Badge>
						{/each}
					</div>
				{/if}
			</div>
			<div class="mt-12 flex w-full justify-center gap-2 md:justify-start">
				<Button href={`/movie/${movieData.id}`} class="flex-grow md:flex-grow-0"
					>Find a place to watch</Button
				>
				<Button
					variant="secondary"
					class="flex flex-grow gap-2 text-lg md:flex-grow-0"
					on:click={onReroll}
					disabled={submitting}
				>
					<RefreshCcw /> <span class="hidden md:inline">Reroll</span>
				</Button>
			</div>
		</div>
	</div>
	<WatchProvidersSection {watchProviders} />
</Card>
