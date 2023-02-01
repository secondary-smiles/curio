<script lang="ts">
	import type { Word } from '$lib/util/word';
	import type { Timestamp } from 'firebase/firestore/lite';

	import { ColorHash } from '$lib/util/color';

	import { parse } from '$lib/util/sanitize';

	import dayjs from 'dayjs';
	import { deleteWord } from '$lib/util/firebase';
	import { currentUser } from '$lib/util/firebase-auth';

	export let word: Word;

	let alive = true;

	const colorHash = new ColorHash();
	const color = colorHash.hex(word.uid);

	const date: Timestamp = word.time as Timestamp;
	let time: Date | string = date.toDate();
	time = dayjs(time.toLocaleString()).format('YYYY-MM-DD, hh:mma');

	let def = '';
	$: def = parse(word.def);

	let deleteStatus = 'delete';

	async function deleteThisWord() {
		if (deleteStatus != 'confirm?') {
			deleteStatus = 'confirm?';
			return;
		}

		deleteStatus = 'deleting';

		await deleteWord(word);
		deleteStatus = 'deleted';

		alive = false;
	}
</script>

{#if alive}
	<main>
		<div class="title">
			<h2 class="word-title">
				<a class="title-link" href="/w/{word.word}">{word.word}</a>
			</h2>

			<p class="word-type">{word.type.abv}.</p>
			<div class="user-info">
				<div class="user-color">
					<a href="/u/{word.uid}">
						<div class="color-display" style="background: {color};" />
						<p class="user-hex">{color}</p>
					</a>
				</div>
				<div class="user-time">
					<p class="posted-time">{time}</p>
				</div>
			</div>
		</div>
		<hr class="divider-top" />
		<div class="word-def">
			<p>{@html def}</p>
		</div>
		{#if word.uid == currentUser?.uid}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<p class="pseudolink" on:click={deleteThisWord}>
				{deleteStatus}
			</p>
		{/if}
		<hr class="divider-bottom" />
	</main>
{/if}

<style>
	main {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pseudolink {
		font-size: 0.8em;
	}

	.divider-top {
		width: 15%;
	}

	.divider-bottom {
		width: 25%;

		border: 0;
		border-top: 2px solid var(--accent-color);
	}

	.word-title {
		margin-bottom: 0;
	}

	.title-link {
		color: var(--text-color);
	}

	.word-type {
		margin-top: 0;
		color: var(--accent-color);
	}

	.word-def {
		max-width: 300px;
		word-break: break-word;
	}

	.user-info {
		display: flex;
		justify-content: space-between;

		cursor: pointer;
	}

	.user-color > a {
		display: flex;
		align-items: center;
		margin: 0 4px;
	}

	.color-display {
		width: 10px;
		height: 10px;

		border-radius: 2px;

		margin: 2px;
	}

	.user-hex,
	.posted-time {
		color: var(--alt-accent-color);
	}

	.user-time {
		margin: 0 4px;
	}
</style>
