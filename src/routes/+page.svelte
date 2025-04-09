<script lang="ts">
  import { enhance } from "$app/forms";
  let question = $state("");
  function createPoll() {
    console.log("create poll");
  }
</script>

<main class="h-screen w-screen bg-stone-900">
  <section class="grid h-full w-full -translate-y-40 place-items-center">
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
  </section>
</main>
