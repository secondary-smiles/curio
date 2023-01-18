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

<main>
	{#each wordList as word}
		<Word {word} />
	{/each}
	{#if !buttonStatus}
		<button disabled={buttonStatus} on:click={getMoreWords}>load more</button>
	{:else}
		<p>end of words.</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
	}

	button {
		margin-top: 5%;
	}

	p {
		color: var(--alt-accent-color);
	}
</style>
