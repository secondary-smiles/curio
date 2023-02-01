<script lang="ts">
	import LogOutButton from './LogOutButton.svelte';
	import SearchButton from './SearchButton.svelte';
	import SubmitWordButton from './SubmitWordButton.svelte';
	import RandomButton from './RandomButton.svelte';
</script>

<main>
	<hr />
	<div class="header-inner">
		<div class="title">
			<a href="/"><p class="title-name">The Curio</p></a>
			<p class="title-meta">a collection of language</p>
		</div>
		<div class="header-buttons">
			<div class="search-button">
				<SearchButton />
			</div>
			<div class="random-button">
				<RandomButton />
			</div>
			<div class="submit-button">
				<SubmitWordButton />
			</div>
			<div class="logout-button">
				<LogOutButton />
			</div>
		</div>
	</div>
	<hr />
</main>

<style>
	a {
		text-decoration: none;
	}

	.header-buttons {
		display: flex;
		align-items: center;
	}

	.header-buttons > * {
		margin: 0 4px;
	}

	.header-inner {
		display: flex;
		justify-content: space-evenly;
	}

	.title {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.title p {
		margin: 0;
		padding: 0.5em;
	}

	.title-name {
		font-weight: bold;
		color: var(--accent-color);
	}

	.title-meta {
		color: var(--alt-text-color);
	}
</style>
