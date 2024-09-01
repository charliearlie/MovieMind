<script lang="ts">
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import type {
		MovieSuggestionResponse,
		ErrorResponse,
		TmdbMovieDetails,
		WatchProviders
	} from '$lib/types';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import MovieSuggestionCard from '$lib/components/MovieSuggestionCard.svelte';

	let movieDescription: string = '';
	let submitting: boolean = false;
	let error: string | null = null;
	let suggestion: string | null = null;
	let suggestedMovies: string[] = [];
	let movieData: TmdbMovieDetails | null = null;
	let watchProviders: WatchProviders | null = null;

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
					watchProviders = result.watchProviders;

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

	function clearForm() {
		suggestion = null;
		movieData = null;
		suggestedMovies = [];
	}
</script>

<main class="container max-w-screen-md px-2 xl:max-w-screen-lg">
	<section class="my-8 p-2">
		<div class="flex flex-col items-center text-center">
			<h1 class="text-4xl font-black"><a href="/">Movie Mind</a></h1>
			{#if !suggestion}
				<p class="max-w-96 text-2xl font-light">
					Describe the type of movie you'd like to watch and we'll suggest one for you!
				</p>
				<Button class="text-blue-500 hover:text-blue-700" variant="ghost"
					>or fill in our questionnaire</Button
				>
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
				<Button class="py-8 text-xl font-semibold" type="submit" disabled={submitting}>
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
			<div class="flex w-full flex-col items-center justify-center">
				<p class="text-sm font-light italic">Your description: {movieDescription}</p>
				<Button variant="outline" on:click={clearForm}>Edit description</Button>
			</div>
			<h2 id="suggestion-header" class="mb-4 py-2 text-center text-3xl font-bold">
				Your suggested movie
			</h2>
			<MovieSuggestionCard {movieData} {watchProviders} onReroll={handleReroll} {submitting} />
		</section>
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
