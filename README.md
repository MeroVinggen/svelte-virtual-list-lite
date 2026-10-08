# 🕸️ svelte-virtual-list-lite

A tiny, single-file Svelte 5 virtual list. Fixed item sizes, zero deps, no per-item `ResizeObserver` - just fast scrolling.

> [!TIP]
> Item sizes are **fixed and known upfront**. If you need dynamic per-item heights, this isn't your component. Fixed sizes mean no measurement races, no scroll jitter, no drama.

## Features

- 🚀 Renders only what's visible (+ overscan)
- 🧱 **Row** or **grid** mode, with real CSS `gap`
- ♻️ DOM node recycling (stable slot keying) - no per-scroll create/destroy
- 🪝 Bindable refs + classes for outer/spacer/content wraps
- 📦 Plain object items in, plain object items out (no proxy wrapping)
- 🔔 Manual `triggerUpdate()`, `onRender` callback, and awaitable `rendered()` for external-mutation control
- 🔁 Same-ref updates: mutate an array in place and re-pass it, and the list still re-renders (via `alwaysRerender` prop)

## Usage

```html
<VirtualList
  items={$myStore}
  mode="row"
  itemHeight={40}
>
  {#snippet renderItem(item, index)}
    <div>{item}</div>
  {/snippet}
</VirtualList>
```

> [!IMPORTANT]
> `renderItem` must output **exactly one root element** per item. Extra wrappers or multiple root nodes will break layout.

## Props

| Prop                                            | Default | Notes                                                                                                                                                                                                                             |
| ----------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                                         | -       | Reactive source array (store value, etc.)                                                                                                                                                                                         |
| `mode`                                          | `"row"` | `"row"` or `"grid"`                                                                                                                                                                                                               |
| `itemHeight`                                    | -       | Required                                                                                                                                                                                                                          |
| `itemWidth`                                     | `0`     | Required for `grid` mode                                                                                                                                                                                                          |
| `gapX` / `gapY`                                 | `0`     | Real CSS gap, factored into math                                                                                                                                                                                                  |
| `resetScrollOnItemsChange`                      | `true`  | Auto-scroll to top when `items` reference changes                                                                                                                                                                                 |
| `overscan`                                      | `3`     | Extra **rows** rendered off-screen                                                                                                                                                                                                |
| `onRender`                                      | -       | Callback fired after a data-driven re-render (scroll excluded)                                                                                                                                                                    |
| `outerClass` / `spacerClass` / `contentClass`   | -       | Style hooks                                                                                                                                                                                                                       |
| `outerRef` / `spacerRef` / `contentRef`         | -       | Bindable DOM refs                                                                                                                                                                                                                 |
| `padTop` / `padBottom` / `padLeft` / `padRight` | `0`     | outer container padding                                                                                                                                                                                                           |
| `alwaysRerender`                                | `true`  | Re-render on every `items` update, even if the array ref is the same (e.g. mutated in place and re-set in a store). Also makes `onRender` / `rendered()` fire on each update. If `false`, same-ref changes need `triggerUpdate()` |

## Methods (via `bind:this`)

- `scrollToTop()`
- `scrollToIndex(index)`
- `triggerUpdate()` - triggers re-render, use for in-place mutation that never reaches the `items` prop (e.g. plain `$state` mutation, no store notification)
- `rendered()` - resolves after the next data-driven re-render (`items` update when `alwaysRerender` is on, or `triggerUpdate()`); scroll excluded
- `overrideResetScroll(value)` - overrides `resetScrollOnItemsChange` until `restoreResetScroll()` is called
- `restoreResetScroll()` - removes the override and goes back to the prop value

### Manual updates (mutate + trigger)

Skip the array copy when mutating in place - call triggerUpdate() and optionally await rendered() before acting on the new state:

```svelte
<script>
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

<button class="btn" onclick={() => addItem(lastItem++)}>Add</button>

<section class="inner">
  <VirtualList bind:this={vl} {items} itemHeight={40}>
    {#snippet renderItem(item, index)}
      <div class="item">{item}</div>
    {/snippet}
  </VirtualList>
</section>

<style>
  .inner {
    height: 50vh;
  }
</style>
```

### Preserving scroll for a single update

If `resetScrollOnItemsChange` is `true` (default) and you need to skip the reset only for certain updates, toggle the prop or use the override methods; the override wins over the prop until restored:

```svelte
<script>
  let vl;

  const refresh = async (newItems) => {
    vl.overrideResetScroll(false); // skip scroll reset for this update
    myStore.set(newItems);
    await vl.rendered();
    vl.restoreResetScroll(); // back to the prop value
  };
</script>

<VirtualList bind:this={vl} items={$myStore} itemHeight={40}>
  {#snippet renderItem(item)}
    <div>{item}</div>
  {/snippet}
</VirtualList>
```

> [!NOTE]
> If the update never reaches the component (e.g. `items` didn't change), `rendered()` never resolves and the override stays on. Call `restoreResetScroll()` yourself in that case.

> [!NOTE]
> Passing a new `items` array (e.g. a fresh store value) resets scroll to top by default. Set `resetScrollOnItemsChange={false}` to disable it globally, or use `overrideResetScroll()` / `restoreResetScroll()` for per-update control.
