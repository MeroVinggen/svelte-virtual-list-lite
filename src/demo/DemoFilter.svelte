<script>
  import VirtualList from "../lib/VirtualList.svelte";

  const all = Array.from({ length: 20_000 }, (_, i) => "Item " + i);

  let query = $state("");
  // a new array on every change -> scroll resets to the top (default)
  const items = $derived(query ? all.filter((s) => s.includes(query)) : all);
</script>

<div class="toolbar">
  <input class="input" placeholder="Filter, e.g. 77" bind:value={query} />
  <span class="spacer"></span>
  <span class="chip">{items.length.toLocaleString()} matches</span>
</div>

<div class="viewport" style="height: 420px;">
  <VirtualList {items} itemHeight={40}>
    {#snippet renderItem(item, index)}
      <div class="item">{item} <small>#{index}</small></div>
    {/snippet}
  </VirtualList>
</div>
