<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const poll = data.result;
  const options = data.pollOptions;

  let value = $state();
</script>

<pre class="absolute opacity-60">
<code>
        {JSON.stringify(data, null, 2)}
</code>
</pre>

<section class="flex flex-col items-center gap-40 pt-8">
  <div class="w-96 rounded-xl bg-cyan-600 p-4 text-center text-2xl">
    <h1>{poll.message}</h1>
  </div>
  <div class="w-96">
    <form method="POST" use:enhance action="?/createOptions">
      <input
        bind:value
        name="opinion"
        placeholder={options.length
          ? "Give your opinion"
          : "Be the first to give an opinion"}
        class="w-full rounded-xl bg-cyan-50 p-4"
      />
    </form>
    {#each data.pollOptions as options}
      <div
        class="my-4 flex items-center justify-between rounded-xl bg-cyan-800 px-2"
      >
        <h2>{options.opinion}</h2>
        <div class="flex flex-col">
          <button>+</button>
          <p>{options.votes}</p>
          <button>-</button>
        </div>
      </div>
    {/each}
  </div>
</section>
