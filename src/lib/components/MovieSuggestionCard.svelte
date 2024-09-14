<script lang="ts">
	import { Card } from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import type { CastMember, CrewMember, TmdbMovieDetails, WatchProviders } from '$lib/types';
	import { getFormattedMovieDuration } from '$lib/utils';
	import WatchProvidersSection from './WatchProviders.svelte';
	import Cast from './Cast.svelte';
	import SuggestionRating from './SuggestionRating/SuggestionRating.svelte';
	import Button from './ui/button/button.svelte';
	import { RefreshCcw } from 'lucide-svelte';
	import { goto, invalidateAll } from '$app/navigation';

	export let cast: CastMember[] = [];
	export let directors: CrewMember[] = [];
	export let movieData: TmdbMovieDetails;
	export let suggestionRating: boolean | null | undefined;
	export let watchProviders: WatchProviders | null;
	export let activePrompt: string | undefined;
	let posterImage: HTMLImageElement;
	let isRerolling = false;
	let displayedMovieData: TmdbMovieDetails;
	let displayedCast: CastMember[] = [];
	let displayedDirectors: CrewMember[] = [];
	let displayedWatchProviders: WatchProviders | null;
	let displayedSuggestionRating: boolean | null | undefined;

	$: {
		if (!isRerolling) {
			displayedMovieData = movieData;
			displayedCast = cast;
			displayedDirectors = directors;
			displayedWatchProviders = watchProviders;
			displayedSuggestionRating = suggestionRating;
		}
	}

	function startPosterRotation() {
		posterImage.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(360deg)' }], {
			duration: 1000,
			iterations: Infinity,
			easing: 'linear'
		});
	}

	function stopPosterRotation() {
		posterImage.getAnimations().forEach((animation) => animation.cancel());
	}

	async function handleReroll(event: SubmitEvent) {
		event.preventDefault();
		isRerolling = true;
		startPosterRotation();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const contentType = response.headers.get('content-type');
				if (contentType && contentType.includes('application/json')) {
					const result = await response.json();
					const parsedResponse = JSON.parse(result.data);
					const newId = parsedResponse[1];
					if (newId) {
						await goto(`/movie/selection/${newId}`, { replaceState: true });
						await invalidateAll();
					} else {
						console.error('Reroll result does not contain an id:', result);
					}
				} else {
					console.error('Unexpected content type:', contentType);
					const text = await response.text();
					console.error('Response text:', text);
				}
			} else {
				console.error('Reroll failed:', response.status, await response.text());
			}
		} catch (error) {
			console.error('Error during reroll:', error);
		} finally {
			stopPosterRotation();
			isRerolling = false;
		}
	}
</script>

<div class="w-full rounded-t-none">
	<img
		class="h-52 w-full object-cover object-top md:h-80"
		src={`https://image.tmdb.org/t/p/original${displayedMovieData.backdrop_path}`}
		alt={displayedMovieData.title}
	/>
	<div
		class="container flex max-w-screen-lg flex-col items-center gap-4 p-4 md:flex-row md:items-start"
	>
		<div class="-mt-24 space-y-2">
			<Card class="relative bg-transparent outline outline-1 outline-slate-300">
				<img
					bind:this={posterImage}
					class="h-96 min-w-64 rounded-md outline outline-1 outline-primary-foreground md:h-[29rem] md:w-96"
					src={`https://image.tmdb.org/t/p/w500${displayedMovieData.poster_path}`}
					alt={displayedMovieData.title}
				/>
				<form
					on:submit={handleReroll}
					action="?/reroll"
					class="absolute -bottom-4 left-1/2 z-50 mx-auto -translate-x-1/2"
				>
					<Button
						type="submit"
						class="flex gap-2 hover:bg-gray-300"
						variant="secondary"
						disabled={isRerolling}
					>
						<RefreshCcw />
						{isRerolling ? 'Rerolling...' : 'Reroll'}
					</Button>
					<input type="hidden" value={activePrompt} name="activePrompt" />
				</form>
			</Card>
		</div>
		<div class="flex flex-grow flex-col items-center text-center md:items-start md:text-start">
			<div class="flex-grow">
				<div>
					<div class="flex flex-col justify-center gap-3 md:flex-row md:items-end md:justify-start">
						<h2 class="text-3xl font-bold">{displayedMovieData.title}</h2>
						<p class="text-lg">{new Date(displayedMovieData.release_date).getFullYear()}</p>
					</div>
				</div>
				<p class="text-slate-200">Directed by {displayedDirectors[0]?.name}</p>
				<p class="text-slate-300">{getFormattedMovieDuration(displayedMovieData.runtime)}</p>
				{#if displayedMovieData.genres && displayedMovieData.genres.length > 0}
					<div class="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
						{#each displayedMovieData.genres as genre}
							<Badge variant="secondary">{genre.name}</Badge>
						{/each}
					</div>
				{/if}
				<div class="mt-4 max-w-[850px]">
					<p class="text-slate-300">
						{displayedMovieData.overview}
					</p>
				</div>
				{#if displayedSuggestionRating === null}
					<SuggestionRating {activePrompt} {handleReroll} />
				{/if}
			</div>
		</div>
	</div>
	<div class="flex w-full flex-col items-center gap-4 p-4 md:items-start">
		{#if displayedCast && displayedCast.length > 0}
			<Cast cast={displayedCast} />
		{/if}
		{#if displayedWatchProviders}
			<WatchProvidersSection watchProviders={displayedWatchProviders} />
		{/if}
	</div>
</div>
