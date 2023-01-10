<script lang="ts">
	import SearchButton from './SearchButton.svelte';
	import SubmitButton from './SubmitButton.svelte';
</script>

<main>
	<hr />
	<div id="header-inner">
		<div id="title">
			<a href="/"><p id="title-name">The Curio</p></a>
			<p id="title-meta">a collection of language</p>
		</div>
		<div id="header-buttons">
			<div id="search-button">
				<SearchButton />
			</div>
			<div id="submit-button">
				<SubmitButton />
			</div>
		</div>
	</div>
	<hr />
</main>

<style>
	a {
		text-decoration: none;
	}

	#header-buttons {
		display: flex;
		align-items: center;
	}

	#header-inner {
		display: flex;
		justify-content: space-evenly;
	}

	#title {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	#title p {
		margin: 0;
		padding: 0.5em;
	}

	#title-name {
		font-weight: bold;
		color: var(--accent-color);
	}

	#title-meta {
		color: var(--alt-text-color);
	}

	#search-button {
		margin-right: 4px;
	}

	#submit-button {
		margin-left: 4px;
	}
</style>
