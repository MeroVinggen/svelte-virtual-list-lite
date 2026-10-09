<script>
  import VirtualList from "../lib/VirtualList.svelte";

  // keep totalRows * itemHeight under the browser's max element height
  // (roughly 17M px in Firefox, 33M px in Chrome)
  const items = Array.from({ length: 250_000 }, (_, i) => i);

  let vl = $state();
  let contentRef = $state();
  let domRows = $state(0);
  let target = $state(125_000);

  // count real DOM rows - stays flat no matter how far you scroll
  $effect(() => {
    if (!contentRef) return;
    const count = () => (domRows = contentRef.children.length);
    const mo = new MutationObserver(count);
    mo.observe(contentRef, { childList: true });
    count();
    return () => mo.disconnect();
  });
</script>

<div class="toolbar">
  <button class="btn ghost" onclick={() => vl.scrollToTop()}>Top</button>
  <button class="btn ghost" onclick={() => vl.scrollToIndex(items.length - 1)}
    >Bottom</button
  >
  <input class="input" type="number" min="0" max={items.length - 1} bind:value={target} />
  <button class="btn" onclick={() => vl.scrollToIndex(target)}>Jump</button>
  <span class="spacer"></span>
</div>

<div class="viewport" style="height: 420px;">
  <VirtualList bind:this={vl} bind:contentRef {items} itemHeight={40}>
    {#snippet renderItem(item)}
      <div class="item">Row {item.toLocaleString()}</div>
    {/snippet}
  </VirtualList>
</div>
