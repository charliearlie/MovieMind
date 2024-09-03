<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { CastMember } from '$lib/types';
	import Button from './ui/button/button.svelte';
	import * as Tooltip from './ui/tooltip';

	export let cast: CastMember[] = [];
</script>

<div class="flex items-center gap-2">
	<h3 class="text-xl font-bold">Cast</h3>
	<!-- <Button variant="ghost" href="/">View all</Button> -->
</div>
<ul class="mt-2 flex flex-wrap gap-2">
	{#each cast as castMember}
		<div class="flex w-24 flex-col items-center gap-2">
			<img
				class="h-36 w-28 rounded-sm object-cover"
				src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
				alt={castMember.name}
			/>
			<p class="min-h-4 text-center text-xs">{castMember.name}</p>
			<p class="text-center text-xs text-slate-200">{castMember.character}</p>
		</div>
	{/each}
</ul>
