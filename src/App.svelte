<script>
  import DemoDynamic from "./demo/DemoDynamic.svelte";
  import DemoStatic from "./demo/DemoStatic.svelte";

  let demo = $state("static");
</script>

<nav>
  <button
    class="btn"
    onclick={() => {
      demo = "static";
    }}>Static (10k)</button
  >
  <button
    class="btn"
    onclick={() => {
      demo = "dynamic";
    }}>Dynamic (push)</button
  >
</nav>

{#if demo === "static"}
  <DemoStatic />
{:else}
  <DemoDynamic />
{/if}

<style>
  nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
  }
</style>
