<script lang="ts">
	import Word from '$lib/elem/Word.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Word word={data.word} />
