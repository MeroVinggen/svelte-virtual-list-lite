<script lang="ts" generics="T">
  import type { Snippet } from "svelte";

  type Mode = "row" | "grid";

  let {
    items,
    renderItem,
    mode = "row",
    itemHeight,
    itemWidth = 0,
    gapX = 0,
    gapY = 0,
    padTop = 0,
    padRight = 0,
    padBottom = 0,
    padLeft = 0,
    resetScrollOnItemsChange = true,
    overscan = 3,
    outerClass = "",
    spacerClass = "",
    contentClass = "",
    outerRef = $bindable<HTMLDivElement | undefined>(undefined),
    spacerRef = $bindable<HTMLDivElement | undefined>(undefined),
    contentRef = $bindable<HTMLDivElement | undefined>(undefined),
  }: {
    items?: T[];
    renderItem: Snippet<[T, number]>;
    mode?: Mode;
    itemHeight: number;
    itemWidth?: number;
    gapX?: number;
    gapY?: number;
    padTop?: number;
    padRight?: number;
    padBottom?: number;
    padLeft?: number;
    resetScrollOnItemsChange?: boolean;
    overscan?: number;
    outerClass?: string;
    spacerClass?: string;
    contentClass?: string;
    outerRef?: HTMLDivElement;
    spacerRef?: HTMLDivElement;
    contentRef?: HTMLDivElement;
  } = $props();

  // internal copy
  let list = $state.raw<T[]>([]);

  let scrollTop = $state(0);
  let clientHeight = $state(0);
  let clientWidth = $state(0);
  let rafPending = false;

  // items prop replaced (new array ref, e.g. a store value) -> resync + reset scroll to top
  $effect(() => {
    list = items ?? [];
    if (resetScrollOnItemsChange) {
      scrollToTop();
    }
  });

  // only the outer wrap is measured - no per-item ResizeObserver
  $effect(() => {
    if (!outerRef) {
      return;
    }
    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) {
        return;
      }
      clientHeight = box.height;
      clientWidth = box.width;
    });
    ro.observe(outerRef);
    return () => ro.disconnect();
  });

  let pendingTop = 0;

  const onScroll = (e: Event) => {
    pendingTop = (e.currentTarget as HTMLDivElement).scrollTop;
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(onScrollRafHandler);
  };

  const onScrollRafHandler = () => {
    scrollTop = pendingTop;
    rafPending = false;
  };

  const colPitch = $derived((itemWidth || 1) + gapX);
  const rowPitch = $derived(itemHeight + gapY);

  const itemsPerRow = $derived(
    mode === "grid"
      ? Math.max(1, Math.floor((clientWidth + gapX) / colPitch))
      : 1,
  );
  const rowCount = $derived(Math.ceil(list.length / itemsPerRow));
  // no trailing gap after the last row
  const totalHeight = $derived(rowCount > 0 ? rowCount * rowPitch - gapY : 0);

  const startRow = $derived(
    Math.max(0, Math.floor(scrollTop / rowPitch) - overscan),
  );
  const visibleRows = $derived(Math.ceil(clientHeight / rowPitch) + overscan);
  const endRow = $derived(Math.min(rowCount, startRow + visibleRows));

  const startIndex = $derived(startRow * itemsPerRow);
  const endIndex = $derived(Math.min(list.length, endRow * itemsPerRow));
  const offsetY = $derived(startRow * rowPitch);

  const visible = $derived(
    list
      .slice(startIndex, endIndex)
      .map((item, i) => ({ item, index: startIndex + i })),
  );

  const capacity = $derived(visibleRows * itemsPerRow);

  export const scrollToTop = () => {
    scrollTop = 0;
    if (outerRef) {
      outerRef.scrollTop = 0;
    }
  };

  export const scrollToIndex = (index: number) => {
    const row = Math.floor(index / itemsPerRow);
    const top = row * rowPitch;
    scrollTop = top;
    if (outerRef) {
      outerRef.scrollTop = top;
    }
  };
</script>

<div
  class={outerClass}
  bind:this={outerRef}
  onscroll={onScroll}
  style="overflow-y:auto; height:100%; position:relative; scrollbar-gutter: stable; padding:{padTop}px {padRight}px {padBottom}px {padLeft}px;"
>
  <div
    class={spacerClass}
    bind:this={spacerRef}
    style="height:{totalHeight}px; position:relative;"
  >
    <div
      class={contentClass}
      bind:this={contentRef}
      style="position:absolute; top:0; left:0; width:100%; transform: translateY({offsetY}px);
        display:grid; row-gap:{gapY}px; column-gap:{gapX}px;
        {mode === 'grid'
        ? `grid-template-columns: repeat(${itemsPerRow}, ${itemWidth}px); grid-auto-rows:${itemHeight}px;`
        : `grid-template-columns: 1fr; grid-auto-rows:${itemHeight}px;`}"
    >
      {#each visible as { item, index } (index % capacity)}
        {@render renderItem(item, index)}
      {/each}
    </div>
  </div>
</div>
