<script>
  import { highlight } from "./highlight.js";

  let { code, file = "" } = $props();

  const html = $derived(highlight(code));
  let copied = $state(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => (copied = false), 1200);
    } catch {
      /* clipboard unavailable */
    }
  };
</script>

<div class="code">
  <div class="bar">
    <span class="file">{file}</span>
    <button class="copy" onclick={copy}>{copied ? "Copied" : "Copy"}</button>
  </div>
  <pre><code>{@html html}</code></pre>
</div>

<style>
  .code {
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-height: 560px;
    background: var(--code-bg);
    color: var(--code-fg);
    border: 1px solid var(--code-border);
    border-radius: 16px;
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--code-border);
    font-size: 0.78rem;
  }
  .file {
    flex: 1;
    color: var(--tok-com);
    font-family: ui-monospace, monospace;
  }
  .copy {
    font: inherit;
    color: var(--code-fg);
    background: #1a2542;
    border: 1px solid var(--code-border);
    border-radius: 6px;
    padding: 3px 10px;
    cursor: pointer;
  }
  .copy:active {
    transform: scale(0.95);
  }
  pre {
    flex: 1;
    min-height: 0;
    margin: 0;
    padding: 16px;
    overflow: auto;
    font-size: 0.8rem;
    line-height: 1.65;
    tab-size: 2;
  }
  .code :global(.t-com) {
    color: var(--tok-com);
    font-style: italic;
  }
  .code :global(.t-str) {
    color: var(--tok-str);
  }
  .code :global(.t-kw) {
    color: var(--tok-kw);
  }
  .code :global(.t-num) {
    color: var(--tok-num);
  }
  .code :global(.t-tag) {
    color: var(--tok-tag);
  }
  .code :global(.t-fn) {
    color: var(--tok-fn);
  }
  .code :global(.t-rune) {
    color: var(--tok-rune);
    font-weight: 600;
  }
  .code :global(.t-blk) {
    color: var(--tok-blk);
  }
</style>
