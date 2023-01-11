<script lang="ts" s>
	import type { PageData } from './$types';

	import Word from '$lib/elem/Word.svelte';

	export let data: PageData;

	let resultString = 'results';
	$: resultString = data.words.length == 1 ? 'result' : 'results';
</script>

<main>
	<div id="title">
		<h2 id="result-title">Results for '{data.query}'</h2>
		<p id="result-count">{data.words.length} {resultString}</p>
	</div>

	<div id="results">
		{#each data.words as word}
			<div class="result-word">
				<Word {word} />
			</div>
		{/each}
	</div>
</main>

<style>
	#title {
		text-align: center;
	}

	#result-title {
		margin-bottom: 0;
	}

	#result-count {
		margin-top: 0;
		color: var(--accent-color);
	}

	.result-word {
		padding-top: 10%;
	}
</style>
