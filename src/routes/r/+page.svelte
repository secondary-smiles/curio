<script lang="ts" s>
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<div id="title">
		<h2 id="result-title">Results for '{data.query}'</h2>
	</div>
</main>
