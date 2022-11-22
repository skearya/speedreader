<script>
  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  let paused = false;
  let text = "speedreader";
  let input = "";
  let running = false;
  let wpm = 500;

  async function render() {
    if (input == "") {
      input = "insert text!";
      return;
    }

    running = true;
    const myArray = input.split(" ");

    for (let i = 0; i < myArray.length; i++) {
      while (paused) {
        await delay(100);
      }
      text = myArray[i];
      await delay(60000 / wpm);
    }

    running = false;
  }
</script>

<main>
  <h1>{text}</h1>

  {#if !running}
    <button on:click={render}>Start</button>
  {:else if !paused}
    <button on:click={() => (paused = !paused)}>Pause</button>
  {:else}
    <button on:click={() => (paused = !paused)}>Resume</button>
  {/if}

  {#if !running}
    <div>
      <textarea placeholder="insert text here" bind:value={input} />
    </div>
  {/if}

  <p>wpm: {wpm}</p>
  <input type="range" bind:value={wpm} min="1" max="1000" />
</main>

<style>
</style>
