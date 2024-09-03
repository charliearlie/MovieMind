import { getCurrentlySuggestedMovie } from '$lib/stores/suggestedMovies';
import { getCreditsFromTmdb, getMovieDetailsFromTmdb, getWatchProvidersFromTmdb } from '$lib/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const tmdbId = getCurrentlySuggestedMovie();
	const movie = await getMovieDetailsFromTmdb(tmdbId);
	const credits = await getCreditsFromTmdb(tmdbId);
	const watchProviders = await getWatchProvidersFromTmdb(movie.id);

	const directors = credits.crew.filter((person) => person.job === 'Director');
	const writers = credits.crew.filter((person) => person.department === 'Writing');
	const cast = credits.cast.slice(0, 6);

	console.log({
		cast,
		directors
	});

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
