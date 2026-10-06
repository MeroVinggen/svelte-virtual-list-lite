<script>
  import VirtualList from "../lib/VirtualList.svelte";

  let vl;
  let items = $state([]);
  let lastItem = 0;

  const addItem = async (item) => {
    items.push(item); // mutate in place - no [...items, item] copy needed
    vl.triggerUpdate(); // manually signal the list to re-render
    await vl.rendered(); // wait until the re-render actually happens
    vl.scrollToIndex(items.length - 1); // scroll to the last added item
  };
</script>

<div class="info">
  <strong>Dynamic demo:</strong> mutates <code>items</code> in place (no array
  copy), manually triggers a re-render via <code>triggerUpdate()</code>, awaits
  it with
  <code>rendered()</code>, then scrolls to the newly added item.
</div>

<section class="outer">
  <button class="btn" onclick={() => addItem(lastItem++)}>Add</button>

  <section class="list-render-wrap">
    <VirtualList bind:this={vl} {items} itemHeight={40}>
      {#snippet renderItem(item, index)}
        <div class="item">{item}</div>
      {/snippet}
    </VirtualList>
  </section>
</section>

<style>
  .info {
    padding: 8px 12px;
    margin: 20px 0;
    background-color: var(--info-bg);
    border: 1px solid var(--info-border);
    border-radius: 6px;
    font-size: 1.25rem;
  }
  .info code {
    background-color: #2d3d6c;
    padding: 1px 4px;
    border-radius: 3px;
    font-style: italic;
  }
  .outer {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  button {
    align-self: center;
  }
</style>
