<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<main class="min-h-screen min-w-screen bg-stone-900">
  {@render children()}
</main>
