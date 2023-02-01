<script lang="ts">
	import { verifiedStore } from '$lib/util/store';
	import { authSignOut } from '$lib/util/firebase-auth';
</script>

<main>
	{#if $verifiedStore}
		<button class="sign-out-button" on:click={authSignOut}>sign out</button>
	{:else}
		<a href="/s"><button class="sign-in-button">sign in</button></a>
	{/if}
</main>
