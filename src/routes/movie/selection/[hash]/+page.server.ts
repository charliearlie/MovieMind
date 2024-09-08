import prisma from '$lib/prisma';
import { getCreditsFromTmdb, getMovieDetailsFromTmdb, getWatchProvidersFromTmdb } from '$lib/tmdb';
import type { Actions, PageServerLoad } from './$types';

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
	const cast = structuredClone(credits.cast.slice(0, 6));

	return {
		props: {
			directors,
			cast,
			movie,
			suggestionRating: moviePrompt.suggestionRating,
			watchProviders,
			writers
		}
	};
};

export const actions: Actions = {
	rate: async ({ params, request }) => {
		const id = params.hash as string;
		const formData = await request.formData();
		const intent = formData.get('intent');

		await prisma.promptResult.update({
			where: {
				id
			},
			data: {
				suggestionRating: intent === 'like' ? true : false
			}
		});

		return { success: true };
	}
};
