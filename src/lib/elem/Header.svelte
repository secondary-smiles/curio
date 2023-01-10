<script lang="ts">
  import SearchButton from "./SearchButton.svelte";
</script>

<main>
  <hr />
  <div id="header-inner">
    <div id="title">
      <p id="title-name">The Curio</p>
      <p id="title-meta">a collection of language</p>
    </div>
    <div id="header-buttons">
      <SearchButton />
    </div>
  </div>
  <hr />
</main>

<style>
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
</style>
