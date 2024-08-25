<script lang="ts">
	import { page } from '$app/stores';

	let movieDescription = $page.url.searchParams.get('description') || '';
</script>

<main>
	<h1 class="text-2xl font-bold">Movie Results</h1>
	<p>Your movie description: {movieDescription}</p>
	<!-- TODO: Add more content here based on the API response -->
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	h1 {
		color: #333;
		text-align: center;
	}

	p {
		color: #666;
	}
</style>
