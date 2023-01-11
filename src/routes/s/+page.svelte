<script lang="ts">
	import { googleAuthUser, authSignOut } from '$lib/util/firebase-auth';
	import { authStore } from '$lib/util/store';
</script>

<main>
	<button on:click={googleAuthUser}>auth</button>
	<button on:click={authSignOut}>out</button>

	{#if $authStore}
		<p>signed in</p>
	{:else}
		<LoginPage />
		{/if}
</main>
