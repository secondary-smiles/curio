<script lang="ts" s>
	import type { PageData } from './$types';

	import Word from '$lib/elem/Word.svelte';

	export let data: PageData;

	let resultString = 'results';
	$: resultString = data.words.length == 1 ? 'result' : 'results';
</script>

<svelte:head>
	<title>{data.query} Results - The Curio</title>
	<meta name="description" content="The Curio - Word search results for '{data.query}'" />
</svelte:head>

<main>
	<div class="title">
		<h2 class="result-title">Results for '{data.query}'</h2>
		<p class="result-count">{data.words.length} {resultString}</p>
	</div>

	<div class="results">
		{#each data.words as word}
			<div class="result-word">
				<Word {word} />
			</div>
		{/each}
	</div>
	<p class="subtext">this search function sucks, i'm working on improving it right now.<p>
</main>

<style>
	.title {
		text-align: center;
	}

	.result-title {
		margin-bottom: 0;
	}

	.result-count {
		margin-top: 0;
		color: var(--accent-color);
	}

	.result-word {
		padding-top: 10%;
	}
</style>
