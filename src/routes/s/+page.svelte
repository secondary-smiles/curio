<script lang="ts">
	import { loadedAuthStore, authStore, verifiedStore } from '$lib/util/store';

	import LoginPage from '$lib/elem/LoginPage.svelte';
	import SubmitWord from '$lib/elem/SubmitWord.svelte';

	let authLoaded: boolean;
	loadedAuthStore.subscribe((value) => (authLoaded = value));
</script>

<main>
	{#if authLoaded}
		{#if $authStore && $verifiedStore}
			<SubmitWord />
		{:else}
			<LoginPage />
		{/if}
	{:else}
		<p>loading..</p>
	{/if}
</main>
