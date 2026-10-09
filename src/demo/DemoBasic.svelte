<script>
  import VirtualList from "../lib/VirtualList.svelte";

  const items = Array.from({ length: 10_000 }, (_, i) => ({
    id: i,
    name: "Item " + i,
  }));
</script>

<!-- the list fills its parent: give the parent a height -->
<div class="viewport" style="height: 360px;">
  <VirtualList {items} itemHeight={40}>
    {#snippet renderItem(item, index)}
      <div class="item">{item.name} <small>#{index}</small></div>
    {/snippet}
  </VirtualList>
</div>
