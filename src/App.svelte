<script>
  import Section from "./docs/Section.svelte";
  import { stripStyle } from "./docs/highlight.js";

  import DemoBasic from "./demo/DemoBasic.svelte";
  import DemoFilter from "./demo/DemoFilter.svelte";
  import DemoGrid from "./demo/DemoGrid.svelte";
  import DemoHuge from "./demo/DemoHuge.svelte";
  // the code shown next to each demo is the real demo source
  import basicSrc from "./demo/DemoBasic.svelte?raw";
  import filterSrc from "./demo/DemoFilter.svelte?raw";
  import gridSrc from "./demo/DemoGrid.svelte?raw";
  import hugeSrc from "./demo/DemoHuge.svelte?raw";

  const sections = [
    {
      id: "basic",
      nav: "Basic",
      title: "Basic usage",
      lead: "Pass <code>items</code>, a fixed <code>itemHeight</code> and a <code>renderItem</code> snippet. Only visible rows (plus <code>overscan</code>) exist in the DOM.",
      file: "DemoBasic.svelte",
      src: basicSrc,
      Demo: DemoBasic,
    },
    {
      id: "huge",
      nav: "250k items & scroll to",
      title: "A lot of items & scroll to",
      lead: "250 000 rows, same cost. Rows are recycled by key (<code>index % capacity</code>), so the DOM row count stays flat while you scroll or jump with <code>scrollToIndex()</code>.",
      file: "DemoHuge.svelte",
      src: hugeSrc,
      Demo: DemoHuge,
    },
    {
      id: "grid",
      nav: "Grid",
      title: "Grid mode",
      lead: '<code>mode="grid"</code> packs as many columns as fit. Resize the box - columns reflow via the container <code>ResizeObserver</code>.',
      file: "DemoGrid.svelte",
      src: gridSrc,
      Demo: DemoGrid,
    },
    {
      id: "filter",
      nav: "Filter",
      title: "Replace items (scroll resets)",
      lead: "Default behaviour: a new <code>items</code> reference resets scroll to the top - what you want after a filter or sort.",
      file: "DemoFilter.svelte",
      src: filterSrc,
      Demo: DemoFilter,
    },
  ];

  const props = [
    ["items", "T[]", "Data. Same-ref mutation needs triggerUpdate()."],
    ["renderItem", "Snippet<[T, number]>", "Row snippet: (item, index)."],
    ["itemHeight", "number", "Fixed row height in px. Required."],
    ["mode", '"row" | "grid"', 'Layout. Default "row".'],
    ["itemWidth", "number", "Column width in px (grid)."],
    ["gapX / gapY", "number", "Gaps between columns / rows. Default 0."],
    [
      "padTop / Right / Bottom / Left",
      "number",
      "Inner padding of the scroller. Default 0.",
    ],
    ["overscan", "number", "Extra rows rendered. Default 3."],
    [
      "resetScrollOnItemsChange",
      "boolean",
      "Scroll to top when items ref changes. Default true.",
    ],
    [
      "alwaysRerender",
      "boolean",
      "Force re-render on every items change. Default true.",
    ],
    [
      "outerClass / spacerClass / contentClass",
      "string",
      "Classes for the three wrappers.",
    ],
    [
      "outerRef / spacerRef / contentRef",
      "HTMLDivElement",
      "Bindable wrapper elements.",
    ],
    ["onRender", "() => void", "Fires on data changes, not on scroll/resize."],
  ];

  const methods = [
    ["triggerUpdate()", "void", "Re-render after in-place mutation."],
    ["rendered()", "Promise<void>", "Resolves after the next render."],
    [
      "scrollToIndex(i)",
      "void",
      "Scroll so row/item i is at the top (clamped).",
    ],
    ["scrollToTop()", "void", "Reset scroll to 0."],
    [
      "overrideResetScroll(v)",
      "void",
      "Override resetScrollOnItemsChange at runtime.",
    ],
    ["restoreResetScroll()", "void", "Back to the prop value."],
  ];
</script>

<nav>
  <div class="in">
    <strong class="brand">VirtualList</strong>
    {#each sections as s}
      <a href="#{s.id}">{s.nav}</a>
    {/each}
    <a href="#api">API</a>
  </div>
</nav>

<main class="wrap">
  <header class="hero">
    <h1>VirtualList</h1>
    <p>
      Fixed-height virtual list for Svelte 5. Renders only what is visible,
      measures only the container, supports rows and grids.
    </p>
    <div class="chips">
      <span class="chip">windowed rendering</span>
      <span class="chip">no per-item measuring</span>
      <span class="chip">row + grid</span>
      <span class="chip">in-place updates</span>
    </div>
  </header>

  {#each sections as s, i}
    <Section
      id={s.id}
      index={i + 1}
      title={s.title}
      lead={s.lead}
      file={s.file}
      code={stripStyle(s.src)}
    >
      <s.Demo />
    </Section>
  {/each}

  <section id="api">
    <h2>API</h2>

    <h3>Props</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead>
        <tbody>
          {#each props as [name, type, note]}
            <tr
              ><td><code>{name}</code></td><td><code>{type}</code></td><td
                >{note}</td
              ></tr
            >
          {/each}
        </tbody>
      </table>
    </div>

    <h3>Methods (via <code>bind:this</code>)</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Method</th><th>Returns</th><th>Notes</th></tr></thead>
        <tbody>
          {#each methods as [name, type, note]}
            <tr
              ><td><code>{name}</code></td><td><code>{type}</code></td><td
                >{note}</td
              ></tr
            >
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</main>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: color-mix(in srgb, #0a0f186b 82%, transparent);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .in {
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 1180px;
    margin: 0 auto;
    padding: 15px 20px;
    overflow-x: auto;
    flex-wrap: wrap;
  }
  .brand {
    margin-right: 12px;
    letter-spacing: -0.01em;
    flex-grow: 1;
  }
  nav a {
    border-radius: 8px;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.875rem;
    white-space: nowrap;
    transition:
      background 150ms,
      color 150ms;
  }
  nav a:hover {
    color: var(--fg);
  }

  .wrap {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 20px 96px;
  }

  .hero {
    padding: 30px 0 8px;
  }
  .hero h1 {
    margin: 0 0 12px;
    font-size: clamp(2.2rem, 6vw, 3.6rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
    background: linear-gradient(120deg, var(--fg), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .hero p {
    margin: 0 0 20px;
    max-width: 60ch;
    font-size: 1.15rem;
    color: var(--muted);
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  #api {
    padding-top: 64px;
  }
  #api h2 {
    margin: 0 0 8px;
    font-size: 1.4rem;
    letter-spacing: -0.015em;
  }
  #api h3 {
    margin: 24px 0 10px;
    font-size: 1rem;
    color: var(--muted);
  }
  .table-wrap {
    overflow-x: auto;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }
  th,
  td {
    padding: 10px 16px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid var(--border);
  }
  th {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  tbody tr:last-child td {
    border-bottom: none;
  }
  td:last-child {
    color: var(--muted);
  }
</style>
