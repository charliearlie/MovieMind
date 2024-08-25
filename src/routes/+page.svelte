<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import { RefreshCcw } from 'lucide-svelte';
	import type { MovieSuggestionResponse, ErrorResponse, TmdbMovieDetails } from '$lib/types';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Card } from '$lib/components/ui/card/index.js';
	import { getFormattedMovieDuration } from '$lib/utils';

	let movieDescription: string = '';
	let submitting: boolean = false;
	let error: string | null = null;
	let suggestion: string | null = null;
	let suggestedMovies: string[] = [];
	let movieData: TmdbMovieDetails | null = null;

	async function handleSubmit(isReroll: boolean = false): Promise<void> {
		if (movieDescription.trim() || isReroll) {
			submitting = true;
			error = null;
			try {
				const response = await fetch('/api/submit-description', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ movieDescription, isReroll })
				});

				if (response.ok) {
					const result: MovieSuggestionResponse = await response.json();
					console.log('Server response:', result);
					suggestion = result.suggestion;
					movieData = result.movieTmdb;
					suggestedMovies = result.suggestedMovies;

					await tick();

					setTimeout(() => {
						const header = document.getElementById('suggestion-header');
						if (header) {
							header.scrollIntoView({ behavior: 'smooth' });
						}
					}, 100);
				} else {
					const errorResult: ErrorResponse = await response.json();
					error = errorResult.error || 'Failed to submit description';
					console.error(error);
				}
			} catch (err) {
				error = err instanceof Error ? err.message : 'An unknown error occurred';
				console.error('Error submitting description:', error);
			} finally {
				submitting = false;
			}
		}
	}

	function handleReroll() {
		handleSubmit(true);
	}
</script>

<main class="max-w-[800px] mt-0 mx-auto px-2">
	<section class="my-8 p-2">
		<div class="flex flex-col items-center text-center">
			<h1 class="text-4xl font-black">Movie Mind</h1>
			{#if !suggestion}
				<p class="text-2xl max-w-96 font-light">
					Describe the type of movie you'd like to watch and we'll suggest one for you!
				</p>
			{/if}
		</div>

		{#if !suggestion && movieData === null}
			<form class="pt-8" on:submit|preventDefault={() => handleSubmit(false)}>
				<Textarea
					class="text-xl"
					bind:value={movieDescription}
					placeholder="Enter a description of the movie you're looking for..."
					rows={4}
					disabled={submitting}
				/>
				<Button class="text-xl font-semibold py-8" type="submit" disabled={submitting}>
					{#if submitting}
						Submitting...
					{:else}
						Find Movie
					{/if}
				</Button>
			</form>
		{/if}
	</section>

	{#if suggestion && movieData}
		<section>
			<div class="flex flex-col w-full items-center justify-center">
				<p class="text-sm font-light italic">Your description: {movieDescription}</p>
				<Button variant="outline">Edit description</Button>
			</div>
			<h2 id="suggestion-header" class="text-3xl mb-4 font-bold py-2 text-center">
				Your suggested movie
			</h2>
			<Card>
				<img
					class="w-full h-60 object-cover object-top rounded-t-md"
					src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
					alt={movieData.title}
				/>
				<div class="p-4 flex gap-4">
					<div class="-mt-24">
						<img
							class="md:w-48 h-48 md:h-64 rounded-md outline outline-1 outline-primary-foreground"
							src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
							alt={movieData.title}
						/>
					</div>
					<div class="flex flex-col justify-between">
						<div>
							<h3 class="text-2xl font-bold">{movieData.title}</h3>
							<p class="text-lg font-semibold">{new Date(movieData.release_date).getFullYear()}</p>
							<p class="font-light">Runtime: {getFormattedMovieDuration(movieData.runtime)}</p>
						</div>
						<div class="flex gap-2">
							<Button href={`/movie/${movieData.id}`} class="">Find a place to watch</Button>
							<Button
								variant="secondary"
								class="flex gap-2 text-lg"
								on:click={handleReroll}
								disabled={submitting}><RefreshCcw /> Reroll</Button
							>
						</div>
					</div>
				</div>
			</Card>
		</section>
	{/if}

	{#if suggestedMovies.length > 0}
		<div class="suggested-movies">
			<h3>Previously Suggested Movies:</h3>
			<ul>
				{#each suggestedMovies as movie}
					<li>{movie}</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if error}
		<p class="error">{error}</p>
	{/if}
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	button {
		padding: 10px 20px;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
	}

	button:hover:not(:disabled) {
		background-color: #45a049;
	}

	button:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	.error {
		color: red;
		text-align: center;
		margin-top: 10px;
	}

	.suggestion,
	.suggested-movies {
		margin-top: 20px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		margin-bottom: 5px;
	}
</style>
