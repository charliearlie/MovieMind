<script lang="ts">
	import { RefreshCcw } from 'lucide-svelte';
	import { Card } from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import type { TmdbMovieDetails, WatchProviders } from '$lib/types';
	import { getFormattedMovieDuration } from '$lib/utils';
	import WatchProvidersSection from './WatchProviders.svelte';

	export let movieData: TmdbMovieDetails;
	export let watchProviders: WatchProviders | null;
</script>

<div class="w-full rounded-t-none">
	<img
		class="h-60 w-full object-cover object-top md:h-96"
		src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
		alt={movieData.title}
	/>
	<div
		class="container flex max-w-screen-lg flex-col items-center gap-4 p-4 md:flex-row md:items-start"
	>
		<div class="-mt-24 md:-mt-36">
			<Card class="outline outline-1 outline-slate-300">
				<img
					class="h-80 min-w-64 rounded-md outline outline-1 outline-primary-foreground md:h-[29rem] md:w-96"
					src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
					alt={movieData.title}
				/>
			</Card>
		</div>
		<div class="flex flex-grow flex-col items-center text-center md:items-start md:text-start">
			<div class="flex-grow">
				<h2 class="text-3xl font-bold">{movieData.title}</h2>
				<p class="text-xl font-semibold">{new Date(movieData.release_date).getFullYear()}</p>
				<p class="max-w-[850px] text-slate-300">{movieData.overview}</p>
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
				<p class="text-sm font-light">Rerolling is coming back soon</p>
				<!-- <Button variant="secondary" disabled class="flex flex-grow gap-2 text-lg md:flex-grow-0">
					<RefreshCcw /> <span class="hidden md:inline">Reroll</span>
				</Button> -->
			</div>
		</div>
	</div>
	<WatchProvidersSection {watchProviders} />
</div>
