<script>
	import { PlayCircle } from 'lucide-svelte';
	import '../app.css';
</script>

<div
	class="flex min-h-screen flex-col bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-800 text-white"
>
	<header class="flex h-14 items-center px-4 lg:px-6">
		<a class="flex items-center justify-center" href="/">
			<PlayCircle />
			<span class="ml-2 text-xl font-bold">Movie Mind</span>
		</a>
	</header>
	<slot />
	<footer class="flex h-14 items-center justify-center bg-slate-800 text-slate-200">
		<p class="text-center">
			&copy; {new Date().getFullYear()} Movie Mind. Built with SvelteKit by
			<a class="text-blue-400" href="https://www.github.com/charliearlie">Charlie Waite</a>
		</p>
	</footer>
</div>
