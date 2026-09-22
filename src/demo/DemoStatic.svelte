<script>
  import VirtualList from "../lib/VirtualList.svelte";

  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));
</script>

<section>
  <VirtualList {items} itemHeight={32}>
    {#snippet renderItem(item)}
      <div class="item">{item.name}</div>
    {/snippet}
  </VirtualList>
</section>

<style>
  section {
    height: 50vh;
    border: solid 2px;
  }
  .item {
    height: 32px;
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
  }
</style>
