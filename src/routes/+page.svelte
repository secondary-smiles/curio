<script lang="ts">
	import Word from '$lib/elem/Word.svelte';
	import { getNextWords } from '$lib/util/firebase';
	import type { PageData } from './$types';

	export let data: PageData;

	let wordList = data.words;
	let buttonStatus = false;

	async function getMoreWords() {
		try {
			const data = await getNextWords();
			wordList = wordList.concat(data);
		} catch (err) {
			buttonStatus = true;
			console.error(err);
		}
	}
</script>

<svelte:head>
	<title>home page - The Curio</title>
	<meta name="description" content="The Curio - A collection of language" />
</svelte:head>

<main>
	{#if wordList.length > 0}
		{#each wordList as word}
			<Word {word} />
		{/each}
		{#if !buttonStatus}
			<button disabled={buttonStatus} on:click={getMoreWords}>load more</button>
		{:else}
			<p class="subtext">end of words.</p>
		{/if}
	{:else}
		<p class="subtext">no words exist.</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
	}

	button {
		margin-top: 5%;
	}
</style>
