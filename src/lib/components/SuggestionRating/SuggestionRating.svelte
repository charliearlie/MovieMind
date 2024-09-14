<script lang="ts">
	import { RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	import Button from '../ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	export let handleReroll: (event: SubmitEvent) => Promise<void>;
	export let activePrompt: string | undefined;

	let dialogOpen = false;

	let form;
</script>

<h4 class="text-lg font-bold">Rate suggestion</h4>
<div class="mt-2 flex justify-center gap-2 md:justify-start">
	<Button
		on:click={() => (dialogOpen = true)}
		name="intent"
		value="dislike"
		variant="destructive"
		size="circle"
	>
		<ThumbsDown />
	</Button>
	<form bind:this={form} method="POST" action="?/rate" use:enhance>
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
	<Dialog.Root open={dialogOpen} onOutsideClick={() => (dialogOpen = false)}>
		<Dialog.Content>
			<Dialog.Header>
				<h4 class="text-xl font-black">Bad suggestion?</h4>
				<p>Try rerolling for a new pick</p>
			</Dialog.Header>
			<Dialog.Description class="flex items-center justify-center gap-4">
				<Dialog.Close asChild>
					<form
						on:submit={(event) => {
							dialogOpen = false;
							handleReroll(event);
						}}
						method="post"
						action="?/reroll"
					>
						<Button type="submit">
							<RefreshCw /> Reroll
						</Button>
						<input type="hidden" value={activePrompt} name="activePrompt" />
					</form>
				</Dialog.Close>
				<Dialog.Close asChild>
					<Button variant="secondary">I'm OK</Button>
				</Dialog.Close>
			</Dialog.Description>
		</Dialog.Content>
	</Dialog.Root>
</div>
