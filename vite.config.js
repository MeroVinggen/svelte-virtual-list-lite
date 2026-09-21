import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
export default {
  base: '/REPO_NAME/',
  plugins: [svelte()],
  preprocess: vitePreprocess()
};
