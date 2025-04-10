<script lang="ts">
  import { enhance } from "$app/forms";
  import { SvelteMap } from "svelte/reactivity";
  import type { PageProps } from "./$types";
  const { data, form }: PageProps = $props();

  const poll = data.result;
  const options = data.pollOptions;
  let optionShown = $state(options);

  let value = $state("");

  let changed = new SvelteMap<number, boolean>();
  let optimisticVotes = new SvelteMap<number, number>();
  function voted(
    optionId: number,
    votes: number,
    operation: "INCREASE" | "DECREASE",
  ) {
    let current = 0;
    if (changed.get(optionId)) {
      current = optimisticVotes.get(optionId)!;
    } else {
      current = votes;
    }

    changed.set(optionId, true);
    if (operation === "INCREASE") {
      optimisticVotes.set(optionId, current + 1);
    } else {
      optimisticVotes.set(optionId, current - 1);
    }
  }

  $effect(() => {
    if (form && form.option !== null && form.option?.length) {
      const newOption = form.option[0];
      optionShown.unshift(newOption);
      form.option.pop();
    }
  });
</script>

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
    {#each optionShown as option}
      <div
        class="my-4 flex items-center justify-between rounded-xl bg-cyan-800 px-2"
      >
        <h2>{option.opinion}</h2>
        <div class="flex flex-col">
          <form method="POST" use:enhance>
            <button
              onclick={() => voted(option.id, option.votes, "INCREASE")}
              class="cursor-pointer"
              formaction={`?/increaseVote&opinionId=${option.id}`}>+</button
            >
            <p>
              {changed.get(option.id)
                ? optimisticVotes.get(option.id)
                : option.votes}
            </p>
            <button
              onclick={() => voted(option.id, option.votes, "DECREASE")}
              class="cursor-pointer"
              formaction={`?/decreaseVote&opinionId=${option.id}`}>-</button
            >
          </form>
        </div>
      </div>
    {/each}
  </div>
</section>
