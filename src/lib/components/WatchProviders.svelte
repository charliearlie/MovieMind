<script lang="ts">
	import { InfoIcon } from 'lucide-svelte';
	import type { WatchProviders } from '$lib/types';
	import { capitalise } from '$lib/utils';
	import Button from './ui/button/button.svelte';
	import * as Tooltip from './ui/tooltip';

	export let watchProviders: WatchProviders | null;
</script>

<div class="flex w-full flex-col items-center gap-4 p-4 md:items-start">
	<div class="container flex max-w-screen-lg flex-col items-center gap-4 p-4 md:items-start">
		<h3 class="self-center text-center text-2xl font-bold">Where to watch</h3>
		<Button
			variant="secondary"
			href={watchProviders?.link}
			class="flex-grow self-center md:flex-grow-0"
		>
			View direct links on TMDB
		</Button>
		{#if watchProviders}
			{#each Object.entries(watchProviders) as [key, value]}
				{#if key !== 'link' && Array.isArray(value)}
					<div
						class="flex flex-grow flex-col items-center gap-4 text-center md:items-start md:text-start"
					>
						<div class="flex flex-grow gap-4">
							<h3 class="text-2xl font-bold">{key === 'flatrate' ? 'Stream' : capitalise(key)}</h3>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<InfoIcon />
								</Tooltip.Trigger>
								<Tooltip.Content class="bg-white p-8 text-slate-800">
									We cannot provide deep links just yet. Please follow the link to TMDB
								</Tooltip.Content>
							</Tooltip.Root>
						</div>
						<div class="flex w-full flex-wrap justify-center gap-2 md:justify-start">
							{#each value as provider}
								<div class="flex w-20 flex-col items-center">
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
</div>
