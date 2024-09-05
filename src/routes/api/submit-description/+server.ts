import { generateSlug } from 'random-word-slugs';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getMovieSuggestion } from '$lib/anthropic';
import { getSuggestedMovies, setCurrentlySuggestedMovieId } from '$lib/stores/suggestedMovies';
import { getMovieIdFromTmdb, getWatchProvidersFromTmdb } from '$lib/tmdb';
import { addPromptToHistory, setActivePrompt } from '$lib/stores/prompts';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const movieDescription = data.movieDescription;
	const isReroll = data.isReroll || false;

	if (typeof movieDescription !== 'string' || movieDescription.trim() === '') {
		return error(400, 'Invalid movie description');
	}

	try {
		const movieTitle = await getMovieSuggestion(movieDescription);
		const tmdbId = await getMovieIdFromTmdb(movieTitle.replace(/\[.*\]/, ''));
		const watchProviders = await getWatchProvidersFromTmdb(tmdbId);

		if (!movieTitle) {
			return error(500, 'No movie suggestion received');
		}

		setActivePrompt(movieDescription);
		addPromptToHistory(movieDescription);
		setCurrentlySuggestedMovieId(tmdbId);
		const suggestedMovies = getSuggestedMovies();

		const slug = generateSlug(3, { format: 'kebab' });

		const promptResult = await prisma.promptResult.create({
			data: {
				id: slug,
				prompt: movieDescription,
				claudeResponse: movieTitle,
				tmdbId
			}
		});

		return json({
			message: 'Description processed successfully',
			description: movieDescription,
			suggestion: movieTitle,
			suggestedMovies: suggestedMovies,
			isReroll: isReroll,
			hash: promptResult.id,
			tmdbId,
			watchProviders
		});
	} catch (err) {
		console.error('Error processing movie description:', err);
		if (err instanceof Error) {
			return error(500, err.message);
		}
		return error(500, 'An unknown error occurred while processing the movie description');
	}
};
