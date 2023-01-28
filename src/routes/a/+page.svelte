<script lang="ts">
	import type { PageData } from './$types';

	import Word from '$lib/elem/Word.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>random words - The Curio</title>
	<meta name="description" content="The Curio - Random words from across the site" />
</svelte:head>

<main>
	{#each data.words as word}
		<Word {word} />
	{/each}
	{#if data.words.length < 1}
		<p class="subtext">no words exist.</p>
	{/if}

	<p class="subtext">
		this random function sucks, if you want you can improve it on <a
			href="https://github.com/secondary-smiles/curio">github</a
		>
	</p>
</main>
