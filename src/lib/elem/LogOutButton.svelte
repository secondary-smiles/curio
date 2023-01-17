<script lang="ts">
	import { verifiedStore } from '$lib/util/store';
	import { authSignOut } from '$lib/util/firebase-auth';
	import { goto } from '$app/navigation';
</script>

<main>
	{#if $verifiedStore}
		<button id="sign-out-button" on:click={authSignOut}>sign out</button>
	{:else}
		<button
			id="sign-in-button"
			on:click={() => {
				goto('/s');
			}}>sign in</button
		>
	{/if}
</main>
