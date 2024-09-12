import { getMovieSuggestion } from '$lib/anthropic';
import prisma from '$lib/prisma';
import {
	getCreditsFromTmdb,
	getMovieDetailsFromTmdb,
	getMovieIdFromTmdb,
	getWatchProvidersFromTmdb
} from '$lib/tmdb';
import { generateSlug } from 'random-word-slugs';
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
			activePrompt: moviePrompt.prompt,
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
	},
	reroll: async ({ params, request }) => {
		try {
			const id = params.hash as string;
			const formData = await request.formData();
			const prompt = formData.get('activePrompt') as string;

			const movieTitle = await getMovieSuggestion(prompt);
			const tmdbId = await getMovieIdFromTmdb(movieTitle.replace(/\[.*\]/, ''));

			const slug = generateSlug(3, { format: 'kebab' });

			const promptResult = await prisma.promptResult.create({
				data: {
					id: slug,
					prompt,
					claudeResponse: movieTitle,
					isReroll: true,
					tmdbId
				}
			});

			console.log('Reroll successful:', promptResult);

			return {
				id: promptResult.id
			};
		} catch (error) {
			console.error('Error in reroll action:', error);
			return { error: 'An error occurred during reroll' };
		}
	}
};
