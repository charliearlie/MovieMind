<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { WatchProviders } from '$lib/types';
	import { capitalise } from '$lib/utils';
	import Button from './ui/button/button.svelte';

	export let watchProviders: WatchProviders | null;
</script>

<div class="flex flex-col items-center gap-4 p-4 md:items-start">
	<Button variant="outline" href={watchProviders?.link} class="flex-grow md:flex-grow-0">
		View direct links on TMDB
	</Button>
	{#if watchProviders}
		{#each Object.entries(watchProviders) as [key, value]}
			{#if key !== 'link' && Array.isArray(value)}
				<div
					class="flex flex-grow flex-col items-center gap-4 text-center md:items-start md:text-start"
				>
					<div class="flex-grow">
						<h3 class="text-2xl font-bold">{key === 'flatrate' ? 'Stream' : capitalise(key)}</h3>
					</div>
					<div class="flex w-full justify-center gap-2 md:justify-start">
						{#each value as provider}
							<div class="flex flex-col items-center">
								<img
									class="h-20 w-20 rounded-md"
									src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
									alt={provider.provider_name}
								/>
								<caption class="text-xs">{provider.provider_name}</caption>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>
