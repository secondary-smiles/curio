<script lang="ts">
	import { authStore, verifiedStore } from '$lib/util/store';

	import LoginPage from '$lib/elem/LoginPage.svelte';
</script>

<main>
	{#if $authStore && $verifiedStore}
		<p>signed in</p>
	{:else}
		<LoginPage />
	{/if}
</main>
