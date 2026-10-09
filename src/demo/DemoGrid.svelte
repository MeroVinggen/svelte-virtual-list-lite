<script>
  import VirtualList from "../lib/VirtualList.svelte";

  const items = Array.from({ length: 50_000 }, (_, i) => i);
</script>

<div class="toolbar">
  <span class="chip">drag the bottom-right corner to resize</span>
</div>

<div class="viewport resizable" style="height: 440px;">
  <VirtualList
    {items}
    mode="grid"
    itemWidth={72}
    itemHeight={72}
    gapX={8}
    gapY={8}
    padTop={8}
    padRight={8}
    padBottom={8}
    padLeft={8}
  >
    {#snippet renderItem(item)}
      <div class="tile">{item}</div>
    {/snippet}
  </VirtualList>
</div>
