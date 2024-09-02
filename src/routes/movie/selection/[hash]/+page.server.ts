import { getCurrentlySuggestedMovie } from '$lib/stores/suggestedMovies';
import { getMovieDetailsFromTmdb, getWatchProvidersFromTmdb } from '$lib/tmdb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const tmdbId = getCurrentlySuggestedMovie();
	const movie = await getMovieDetailsFromTmdb(tmdbId);
	const watchProviders = await getWatchProvidersFromTmdb(movie.id);

	return {
		props: {
			movie,
			watchProviders
		}
	};
};
