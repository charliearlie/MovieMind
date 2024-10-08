export interface MovieSuggestionResponse {
	message: string;
	description: string;
	suggestion: string;
	suggestedMovies: string[];
	hash: string;
	isReroll: boolean;
	tmdbId: number;
	watchProviders: WatchProviders;
}

export interface TmdbSearchObject {
	adult: boolean;
	backdrop_path: string;
	genre_ids: Array<number>;
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface TmdbMovieDetails {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: Array<{
		id: number;
		name: string;
	}>;
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Array<{
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}>;
	production_countries: Array<{
		iso_3166_1: string;
		name: string;
	}>;
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: Array<{
		english_name: string;
		iso_639_1: string;
		name: string;
	}>;
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface ErrorResponse {
	error: string;
}

export interface WatchProviders {
	link: string;
	buy: Array<{
		provider_id: number;
		provider_name: string;
		display_priority: number;
	}>;
	flatrate: Array<{
		provider_id: number;
		provider_name: string;
		display_priority: number;
	}>;
	rent: Array<{
		provider_id: number;
		provider_name: string;
		display_priority: number;
	}>;
}

export interface TmdbMovieWatchProviders {
	id: number;
	results: {
		[countryCode: string]: WatchProviders;
	};
}

type Gender = 0 | 1 | 2;

interface Person {
	adult: boolean;
	gender: Gender;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
}

export interface CastMember extends Person {
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface CrewMember extends Person {
	credit_id: string;
	department: string;
	job: string;
}

export interface TmdbCredits {
	id: number;
	cast: CastMember[];
	crew: CrewMember[];
}
