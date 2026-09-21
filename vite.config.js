import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
export default {
  base: '/svelte-virtual-list-lite/',
  plugins: [svelte()],
  preprocess: vitePreprocess()
};
