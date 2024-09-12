<script lang="ts">
	import { goto } from '$app/navigation';
	import type {
		MovieSuggestionResponse,
		ErrorResponse,
		TmdbMovieDetails,
		WatchProviders
	} from '$lib/types';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Send } from 'lucide-svelte';

	let movieDescription: string = '';
	let submitting: boolean = false;
	let error: string | null = null;
	let suggestion: string | null = null;
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
					goto(`/movie/selection/${result.hash}`);
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
</script>

<svelte:head>
	<title>Movie Mind</title>
	<meta
		name="description"
		content="Let Movie Mind choose a movie for you based on your requirements"
	/>
	<meta name="robots" content="noindex, nofollow" />

	<meta property="og:site_name" content="MovieMind | Homepage" />
	<meta property="og:locale" content="en" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={`/moviemind.jpg`} />
</svelte:head>

<main
	class="container -mt-14 flex h-screen max-w-screen-sm items-center justify-center px-2 xl:max-w-screen-md"
>
	<section class="my-8 p-2">
		{#if !suggestion && movieData === null}
			<div class="flex flex-col items-center text-center">
				<h1 class="text-4xl font-black tracking-tight">
					<a href="/">Let us help you find a movie</a>
				</h1>
				{#if !suggestion}
					<p
						class="typing-animation hidden pr-1 text-xl text-violet-200 md:block md:overflow-hidden md:whitespace-nowrap md:border-r-4 md:border-r-violet-200"
					>
						Let Movie Mind choose a movie for you based on your requirements
					</p>
					<p class="pr-1 text-xl text-violet-200 md:hidden md:overflow-hidden md:whitespace-nowrap">
						Let Movie Mind choose a movie for you based on your requirements
					</p>
				{/if}
			</div>
			<form
				class="flex flex-col items-center gap-4 pt-8"
				on:submit|preventDefault={() => handleSubmit(false)}
			>
				<div class="relative w-full">
					<Textarea
						class="h-48 w-full resize-none rounded-lg border-2 border-violet-300 bg-white px-4 py-2 text-gray-700 shadow-md focus:border-violet-500 focus:outline-none md:text-xl"
						bind:value={movieDescription}
						placeholder="Enter a description of the movie you're looking for..."
						rows={6}
						disabled={submitting}
					/>
					<Button
						class="absolute bottom-2 right-2 flex w-max gap-2 rounded-full py-4 shadow-md md:text-lg md:font-semibold"
						type="submit"
						disabled={submitting}
					>
						<Send />

						{#if submitting}
							Submitting...
						{:else}
							Find Movie
						{/if}
					</Button>
				</div>
			</form>
			<!-- <Button class="bg-purple-700" variant="outline">or fill in our questionnaire</Button> -->
		{/if}
	</section>
</main>

<style>
	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink-caret {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: #8b5cf6;
		}
	}

	.typing-animation {
		animation:
			typing 3.5s steps(40, end),
			blink-caret 0.75s step-end infinite;
	}
</style>
