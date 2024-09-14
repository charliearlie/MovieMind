<script lang="ts">
	import type { CastMember } from '$lib/types';

	export let cast: CastMember[] = [];
</script>

<div class="container flex max-w-screen-lg flex-col items-center gap-4 p-4 md:items-start">
	<div class="flex items-end gap-2">
		<h3 class="text-xl font-bold">Cast</h3>
		<a class="text-sm font-light" href="/">View all</a>
	</div>
	<ul class="mt-2 grid grid-cols-3 gap-2 md:grid-cols-6">
		{#each cast as castMember}
			<div class="flex flex-col items-center gap-1">
				<img
					class="h-36 w-full rounded-sm object-cover md:h-48"
					src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
					alt={castMember.name}
				/>
				<p class="text-center text-xs">{castMember.name}</p>
				<p class="text-center text-xs text-slate-200">{castMember.character}</p>
			</div>
		{/each}
	</ul>
</div>
