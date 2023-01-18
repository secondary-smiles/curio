<script lang="ts">
	import Word from '$lib/elem/Word.svelte';
	import { getNextUserWords } from '$lib/util/firebase';
	import type { PageData } from './$types';

	export let data: PageData;

	let buttonStatus = false;
	let wordList = data.words;

	async function getMoreWords() {
		try {
			const words = await getNextUserWords(data.slug);
			wordList = wordList.concat(words);
		} catch (err) {
			buttonStatus = true;
			console.error(err);
		}
	}
</script>

<main>
	{#if wordList.length > 0}
		<div id="title">
			<h2>Words Submitted by</h2>
			<div id="user-colors">
				<div id="color-disp" style="background: {data.hex};" />
				<h2 id="user-hex">{data.hex}</h2>
			</div>
			<hr id="divider" />
		</div>
		{#each wordList as word}
			<Word {word} />
		{/each}
		{#if !buttonStatus}
			<button disabled={buttonStatus} on:click={getMoreWords}>load more</button>
		{:else}
			<p class="subtext">end of words.</p>
		{/if}
	{:else}
		<p class="subtext">user has not submitted any words yet.</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
	}

	#divider {
		width: 45%;
	}

	#user-colors {
		display: flex;

		justify-content: center;
		align-items: center;
	}

	#user-hex {
		margin: 0 4px;
	}

	#color-disp {
		width: 15px;
		height: 15px;

		margin: 0 4px;

		border-radius: 10px;
	}
</style>
