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

| Prop                                            | Default | Notes                                             |
| ----------------------------------------------- | ------- | ------------------------------------------------- |
| `items`                                         | -       | Reactive source array (store value, etc.)         |
| `mode`                                          | `"row"` | `"row"` or `"grid"`                               |
| `itemHeight`                                    | -       | Required                                          |
| `itemWidth`                                     | `0`     | Required for `grid` mode                          |
| `gapX` / `gapY`                                 | `0`     | Real CSS gap, factored into math                  |
| `resetScrollOnItemsChange`                      | `true`  | Auto-scroll to top when `items` reference changes |
| `overscan`                                      | `3`     | Extra **rows** rendered off-screen                |
| `outerClass` / `spacerClass` / `contentClass`   | -       | Style hooks                                       |
| `outerRef` / `spacerRef` / `contentRef`         | -       | Bindable DOM refs                                 |
| `padTop` / `padBottom` / `padLeft` / `padRight` | `0`     | outer container padding                           |

## Methods (via `bind:this`)

- `scrollToTop()`
- `scrollToIndex(index)`

> [!NOTE]
> Passing a new `items` array (e.g. a fresh store value) resets scroll to top by default - set `resetScrollOnItemsChange={false}` if you need scroll-preserving updates instead.
