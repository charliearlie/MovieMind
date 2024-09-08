<script>
	import { ThumbsDown, ThumbsUp } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import Button from '../ui/button/button.svelte';
</script>

<h4 class="text-lg font-bold">Rate suggestion</h4>
<div class="mt-2 flex justify-center gap-2 md:justify-start">
	<form method="POST" action="?/rate" use:enhance>
		<Button type="submit" name="intent" value="dislike" variant="destructive" size="circle">
			<ThumbsDown />
		</Button>
		<Button
			type="submit"
			name="intent"
			value="like"
			class="bg-green-600 hover:bg-green-600/80 hover:text-white/80"
			variant="ghost"
			size="circle"
		>
			<ThumbsUp />
		</Button>
	</form>
</div>
