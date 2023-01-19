<script lang="ts">
	import type { Word } from '$lib/util/word';
	import type { Timestamp } from 'firebase/firestore/lite';

	import { ColorHash } from '$lib/util/color';

	import { parse } from '$lib/util/sanitize';

	import dayjs from 'dayjs';
	import { deleteWord } from '$lib/util/firebase';

	export let word: Word;

	const colorHash = new ColorHash();
	const color = colorHash.hex(word.uid);

	const date: Timestamp = word.time as Timestamp;
	let time: Date | string = date.toDate();
	time = dayjs(time.toLocaleString()).format('YYYY-MM-DD, hh:mm');

	let def = '';
	$: def = parse(word.def);
</script>

<main>
	<div id="title">
		<h2 id="word-title">
			<a id="title-link" href="/w/{word.word}">{word.word}</a>
		</h2>

		<p id="word-type">{word.type.abv}.</p>
		<div id="user-info">
			<div id="user-color">
				<a href="/u/{word.uid}">
					<div id="color-display" style="background: {color};" />
					<p id="user-hex">{color}</p>
				</a>
			</div>
			<div id="user-time">
				<p id="posted-time">{time}</p>
			</div>
		</div>
	</div>
	<hr id="divider-top" />
	<div id="word-def">
		<p>{@html def}</p>
	</div>
	<button
		on:click={() => {
			deleteWord(word);
		}}>delete</button
	>
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

	#title-link {
		color: var(--text-color);
	}

	#word-type {
		margin-top: 0;
		color: var(--accent-color);
	}

	#word-def {
		max-width: 300px;
		word-break: break-word;
	}

	#user-info {
		display: flex;
		justify-content: space-between;

		cursor: pointer;
	}

	#user-color > a {
		display: flex;
		align-items: center;
		margin: 0 4px;
	}

	#color-display {
		width: 10px;
		height: 10px;

		border-radius: 2px;

		margin: 2px;
	}

	#user-hex,
	#posted-time {
		color: var(--alt-accent-color);
	}

	#user-time {
		margin: 0 4px;
	}
</style>
