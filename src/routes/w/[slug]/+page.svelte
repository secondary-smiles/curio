<script lang="ts">
	import Word from '$lib/elem/Word.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.words);
</script>

<main>
	{#each data.words as word}
		<Word {word} />
	{/each}
</main>
