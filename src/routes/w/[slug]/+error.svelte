<script lang="ts">
	import { page } from '$app/stores';

	let message = $page.error!.message;
	message = message ? message.split(' ').join('-') : '';
</script>

<main>
	{#if $page.status == 404}
		<h2>Oops, this word doesn't exist yet</h2>
		{#if message}
			<button><a href="/s?fill={message}">create '{message}'</a></button>
		{/if}
	{:else}
		<h2>{$page.status}</h2>
		<p>{$page.error.message}</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
	}
</style>
