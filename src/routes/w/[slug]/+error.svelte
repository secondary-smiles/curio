<script lang="ts">
	import { page } from '$app/stores';

	import { goto } from '$app/navigation';

	let message = $page.error!.message;
	message = message ? message.split(' ').join('-') : '';
</script>

<main>
	{#if $page.status == 404}
		<h2>Oops, this word doesn't exist yet</h2>
		{#if message}
			<button
				on:click={() => {
					goto(`/s?fill=${message}`);
				}}>Create '{message}'</button
			>
		{/if}
	{/if}
</main>
