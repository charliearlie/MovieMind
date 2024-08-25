import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import { env } from '$env/dynamic/private';
import { addSuggestedMovie, getSuggestedMovies } from './stores/suggestedMovies';

const anthropic = new Anthropic({
	apiKey: ANTHROPIC_API_KEY
});

export async function getMovieSuggestion(description: string): Promise<string> {
	const suggestedMovies = getSuggestedMovies();
	const excludeList = suggestedMovies.join(', ');

	try {
		const message = await anthropic.messages.create({
			model: 'claude-3-opus-20240229',
			max_tokens: 100,
			system:
				'You only speak in movie titles, nothing more nothing less. A user will give you a description and you will just give a movie title back. Do not suggest any movies from the exclude list provided. Also provide the year of the movie in square brackets',
			messages: [
				{
					role: 'user',
					content: `Description: ${description}\nExclude list: ${excludeList}`
				}
			]
		});

		const movieTitle = message.content[0].text.trim() as string;
		addSuggestedMovie(movieTitle);
		return movieTitle;
	} catch (error) {
		console.error('Error calling Anthropic API:', error);
		throw new Error('Failed to get movie suggestion');
	}
}
