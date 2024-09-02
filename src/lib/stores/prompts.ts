import { writable } from 'svelte/store';

export const promptHistory = writable<string[]>([]);
export const activePrompt = writable<string>('');

export function setActivePrompt(prompt: string) {
	activePrompt.set(prompt);
}

export function addPromptToHistory(prompt: string) {
	promptHistory.update((prompts) => [...prompts, prompt]);
}

export function getActivePrompt(): string {
	let prompt: string = '';
	activePrompt.subscribe((value) => {
		prompt = value;
	})();
	return prompt;
}

export function getPromptHistory(): string[] {
	let prompts: string[] = [];
	promptHistory.subscribe((value) => {
		prompts = value;
	})();
	return prompts;
}
