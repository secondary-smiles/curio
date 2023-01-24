<script lang="ts">
	import Word from '$lib/elem/Word.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.words[0].word} - The Curio</title>
</svelte:head>

<main>
	{#each data.words as word}
		<Word {word} />
	{/each}
</main>
