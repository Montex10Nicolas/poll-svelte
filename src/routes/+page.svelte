<script lang="ts">
  import { enhance } from "$app/forms";
  import { ddmmYYYY } from "$lib/date";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let question = $state("");
  function createPoll() {
    console.log("create poll");
  }
</script>

<main class="h-screen w-screen bg-stone-900">
  <section
    class="flex h-full w-full flex-col items-center justify-center gap-16"
  >
    <form
      use:enhance
      class="flex h-26 w-1/3 rounded-4xl bg-stone-300"
      method="POST"
      action="?/createPoll"
    >
      <input
        class="h-full w-full rounded-l-4xl border-none bg-transparent text-2xl"
        type="text"
        bind:value={question}
        onkeydown={(key) => {
          if (key.key === "Enter") {
            createPoll();
          }
        }}
        placeholder="Create a poll..."
        name="question"
      />
      <button
        onclick={createPoll}
        class="w-1/10 cursor-pointer rounded-r-4xl bg-blue-500">send</button
      >
    </form>

    {#if data.latestPoll.length}
      <div class="w-2/4 rounded-xl bg-cyan-700 p-3">
        {#each data.latestPoll as pollValue}
          <div
            class="flex cursor-pointer items-center justify-around rounded-xl bg-cyan-300 p-4 transition-all duration-150 ease-in-out hover:scale-[102%]"
          >
            <h1 class="text-lg font-bold">{pollValue.message}</h1>
            <p class="text-sm text-black/60">
              {ddmmYYYY(pollValue.createdAt as string)}
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>
