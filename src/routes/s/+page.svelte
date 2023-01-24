<script lang="ts">
	import { loadedAuthStore, authStore, verifiedStore } from '$lib/util/store';

	import LoginPage from '$lib/elem/LoginPage.svelte';
	import SubmitWord from '$lib/elem/SubmitWord.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let authLoaded: boolean;
	loadedAuthStore.subscribe((value) => (authLoaded = value));

	let titleState = 'sign in';
	$: {
		if ($authStore && $verifiedStore) {
			titleState = 'submit word';
		} else {
			titleState = 'sign in';
		}
	}
</script>

<svelte:head>
	<title>{titleState} - The Curio</title>
	<meta name="description" content="The Curio - Submit a word to add it to the global dictionary" />
</svelte:head>

<main>
	{#if authLoaded}
		{#if $authStore && $verifiedStore}
			<SubmitWord word={data.fill} />
		{:else}
			<LoginPage />
		{/if}
	{:else}
		<p>loading..</p>
	{/if}
</main>
