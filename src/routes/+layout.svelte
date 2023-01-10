<script lang="ts">
	import Header from '$lib/elem/Header.svelte';
</script>

<main>
	<div id="header">
		<Header />
	</div>
	<div id="content">
		<slot />
	</div>
</main>
