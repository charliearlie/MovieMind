<script lang="ts">
	import { Card } from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import type { CastMember, CrewMember, TmdbMovieDetails, WatchProviders } from '$lib/types';
	import { getFormattedMovieDuration } from '$lib/utils';
	import WatchProvidersSection from './WatchProviders.svelte';
	import Cast from './Cast.svelte';

	export let cast: CastMember[] = [];
	export let directors: CrewMember[] = [];
	export let movieData: TmdbMovieDetails;
	export let watchProviders: WatchProviders | null;
</script>

<div class="w-full rounded-t-none">
	<img
		class="h-52 w-full object-cover object-top md:h-80"
		src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
		alt={movieData.title}
	/>
	<div
		class="container flex max-w-screen-lg flex-col items-center gap-4 p-4 md:flex-row md:items-start"
	>
		<div class="-mt-24 space-y-2">
			<Card class="outline outline-1 outline-slate-300">
				<img
					class="h-96 min-w-64 rounded-md outline outline-1 outline-primary-foreground md:h-[29rem] md:w-96"
					src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
					alt={movieData.title}
				/>
			</Card>
		</div>
		<div class="flex flex-grow flex-col items-center text-center md:items-start md:text-start">
			<div class="flex-grow">
				<div class="flex flex-col justify-center gap-3 md:flex-row md:items-end md:justify-start">
					<h2 class="text-3xl font-bold">{movieData.title}</h2>
					<p class="text-lg">{new Date(movieData.release_date).getFullYear()}</p>
				</div>
				<p class="text-slate-200">Directed by {directors[0].name}</p>
				<p class="text-slate-300">{getFormattedMovieDuration(movieData.runtime)}</p>
				{#if movieData.genres && movieData.genres.length > 0}
					<div class="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
						{#each movieData.genres as genre}
							<Badge variant="secondary">{genre.name}</Badge>
						{/each}
					</div>
				{/if}
				<div class="mt-4 max-w-[850px]">
					<p class="text-slate-300">
						{movieData.overview}
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-full flex-col items-center gap-4 p-4 md:items-start">
		{#if cast && cast.length > 0}
			<Cast {cast} />
		{/if}
		<WatchProvidersSection {watchProviders} />
	</div>
</div>
