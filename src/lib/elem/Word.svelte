<script lang="ts">
	import type { Word } from '$lib/util/word';

	export let word: Word;

	$: {
		if (!word) {
			word = {
				word: 'error',
				type: 'error',
				def: 'error'
			};
		}
	}
</script>

<main>
	<div id="title">
		<h2 id="word-title">{word.word}</h2>
		<p id="word-type">{word.type}.</p>
	</div>
	<hr id="divider-top" />
	<div id="word-def">
		<p>{word.def}</p>
	</div>
	<hr id="divider-bottom" />
</main>

<style>
	main {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#divider-top {
		width: 15%;
	}

	#divider-bottom {
		width: 25%;

		border: 0;
		border-top: 2px solid var(--accent-color);
	}

	#word-title {
		margin-bottom: 0;
	}

	#word-type {
		margin-top: 0;
		color: var(--accent-color);
	}

	#word-def {
		max-width: 300px;
	}
</style>
