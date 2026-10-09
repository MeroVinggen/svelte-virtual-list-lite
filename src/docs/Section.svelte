<script>
  import CodeBlock from "./CodeBlock.svelte";

  let { id, index, title, lead, file = "", code, children } = $props();
</script>

<section {id}>
  <header>
    <span class="num">{index}</span>
    <div>
      <h2>{title}</h2>
      <p>{@html lead}</p>
    </div>
  </header>

  <div class="grid">
    <div class="card">
      <div class="card-head">Preview</div>
      <div class="card-body">{@render children()}</div>
    </div>
    <CodeBlock {code} {file} />
  </div>
</section>

<style>
  section {
    padding-top: 56px;
  }
  header {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .num {
    flex: none;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: var(--accent-soft);
    color: var(--accent);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  h2 {
    margin: 0 0 4px;
    font-size: 1.4rem;
    letter-spacing: -0.015em;
  }
  p {
    margin: 0;
    color: var(--muted);
    max-width: 72ch;
  }
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: 16px;
    align-items: stretch;
  }
  @media (max-width: 960px) {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
  .card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow);
  }
  .card-head {
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .card-body {
    flex: 1;
    min-width: 0;
    padding: 16px;
  }
</style>
