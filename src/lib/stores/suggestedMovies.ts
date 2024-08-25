import { writable } from 'svelte/store';

export const suggestedMovies = writable<string[]>([]);

export function addSuggestedMovie(movie: string) {
    suggestedMovies.update(movies => [...movies, movie]);
}

export function getSuggestedMovies(): string[] {
    let movies: string[] = [];
    suggestedMovies.subscribe(value => {
        movies = value;
    })();
    return movies;
}