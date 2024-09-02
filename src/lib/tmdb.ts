import { TMDB_ACCESS_TOKEN } from '$env/static/private';
import type { TmdbMovieDetails, TmdbMovieWatchProviders, TmdbSearchObject } from './types';

export async function getSuggestedMovieFromTmdb(description: string) {
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${description}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	const movie = data.results[0];

	return movie;
}

export async function getMovieIdFromTmdb(title: string) {
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	const movie = data.results[0] as TmdbSearchObject;

	return movie.id;
}

export async function getMovieDetailsFromTmdb(movieId: number) {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});

	const data = (await response.json()) as TmdbMovieDetails;

	return data;
}

export async function getWatchProvidersFromTmdb(tmdbId: number) {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});
	const data = (await response.json()) as TmdbMovieWatchProviders;

	return data.results.GB;
}
