<script lang="ts">
	import { verifiedStore } from '$lib/util/store';
	import { authSignOut } from '$lib/util/firebase-auth';
</script>

<main>
	{#if $verifiedStore}
		<button id="sign-out-button" on:click={authSignOut}>sign out</button>
	{:else}
		<button id="sign-in-button"><a href="/s">sign in</a></button>
	{/if}
</main>
