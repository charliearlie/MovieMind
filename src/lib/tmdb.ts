import { TMDB_ACCESS_TOKEN } from '$env/static/private';
import type { TmdbMovieDetails, TmdbSearchObject } from './types';

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

export async function getMovieDetailsFromTmdb(title: string) {
	const movieId = await getMovieIdFromTmdb(title);
	const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});

	const data = await response.json() as TmdbMovieDetails;

    return data;
}
