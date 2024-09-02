import { writable } from 'svelte/store';

export const suggestedMovies = writable<string[]>([]);
export const currentlySuggestedMovieId = writable<number | null>(null);

export function setCurrentlySuggestedMovieId(movie: number) {
	currentlySuggestedMovieId.set(movie);
}

export function addSuggestedMovie(movie: string) {
	suggestedMovies.update((movies) => [...movies, movie]);
}

export function getCurrentlySuggestedMovie(): number {
	let movie: number | null = 0;
	currentlySuggestedMovieId.subscribe((value) => {
		movie = value;
	})();
	return movie;
}

export function getSuggestedMovies(): string[] {
	let movies: string[] = [];
	suggestedMovies.subscribe((value) => {
		movies = value;
	})();
	return movies;
}
