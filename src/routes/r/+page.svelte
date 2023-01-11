<script lang="ts" s>
	import type { PageData } from './$types';

	import Word from '$lib/elem/Word.svelte';

	export let data: PageData;
</script>

<main>
	<div id="title">
		<h2 id="result-title">Results for '{data.query}'</h2>
	</div>

	<div id="results">
		{#each data.words as word}
			<Word {word} />
		{/each}
	</div>
</main>
