<script>
  import VirtualList from "./lib/VirtualList.svelte";
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));
</script>

<div style="height:100vh">
  <VirtualList {items} itemHeight={32}>
    {#snippet renderItem(item)}
      <div style="padding:8px; border-bottom:1px solid #ddd">{item.name}</div>
    {/snippet}
  </VirtualList>
</div>
