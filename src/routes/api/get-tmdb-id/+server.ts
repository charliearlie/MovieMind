import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getMovieSuggestion } from '$lib/anthropic';
import { getSuggestedMovies } from '$lib/stores/suggestedMovies';

export const GET: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const movieDescription = data.movieDescription;
	const isReroll = data.isReroll || false;

	if (typeof movieDescription !== 'string' || movieDescription.trim() === '') {
		return error(400, 'Invalid movie description');
	}

	try {
		const movieTitle = await getMovieSuggestion(movieDescription);

		if (!movieTitle) {
			return error(500, 'No movie suggestion received');
		}

		const suggestedMovies = getSuggestedMovies();

		return json({
			message: 'Description processed successfully',
			description: movieDescription,
			suggestion: movieTitle,
			suggestedMovies: suggestedMovies,
			isReroll: isReroll
		});
	} catch (err) {
		console.error('Error processing movie description:', err);
		if (err instanceof Error) {
			return error(500, err.message);
		}
		return error(500, 'An unknown error occurred while processing the movie description');
	}
};
