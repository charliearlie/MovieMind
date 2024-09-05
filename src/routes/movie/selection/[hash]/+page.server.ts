import prisma from '$lib/prisma';
import { getCurrentlySuggestedMovie } from '$lib/stores/suggestedMovies';
import { getCreditsFromTmdb, getMovieDetailsFromTmdb, getWatchProvidersFromTmdb } from '$lib/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const hash = params.hash as string;

	const moviePrompt = await prisma.promptResult.findUnique({
		where: {
			id: hash
		}
	});

	if (!moviePrompt) {
		return {
			status: 404,
			error: new Error('Prompt matching this has can not be found')
		};
	}

	const movie = await getMovieDetailsFromTmdb(moviePrompt.tmdbId);
	const credits = await getCreditsFromTmdb(moviePrompt.tmdbId);
	const watchProviders = await getWatchProvidersFromTmdb(movie.id);

	const directors = credits.crew.filter((person) => person.job === 'Director');
	const writers = credits.crew.filter((person) => person.department === 'Writing');
	const cast = credits.cast.slice(0, 6);

	return {
		props: {
			directors,
			cast,
			movie,
			watchProviders,
			writers
		}
	};
};
