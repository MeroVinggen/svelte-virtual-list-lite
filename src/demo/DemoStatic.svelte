<script>
  import VirtualList from "../lib/VirtualList.svelte";

  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));
</script>

<section class="list-render-wrap">
  <VirtualList {items} itemHeight={40}>
    {#snippet renderItem(item)}
      <div class="item">{item.name}</div>
    {/snippet}
  </VirtualList>
</section>
