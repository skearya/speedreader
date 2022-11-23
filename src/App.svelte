<script>
  import { fade } from "svelte/transition";

  function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  let paused = false;
  let textLast = "";
  let text = "speedreader";
  let textAhead = "";
  let input = "";
  let running = false;
  let wpm = 400;

  function handleKeydown(event) {
    if (event.code == "Space") {
      paused = !paused;
    }
  }

  async function render() {
    if (input == "") {
      input =
        "Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.";
      return;
    }

    paused = false;
    running = true;
    const myArray = input.split(" ");

    for (let i = 0; i < myArray.length; i++) {
      while (paused) {
        await delay(100);
      }
      textLast = myArray[i - 1];
      text = myArray[i];
      textAhead = myArray[i + 1];
      await delay(60000 / wpm);
    }

    running = false;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <h1 id="mainText">{text}</h1>
  {#if running}
    <div transition:fade class="textBox">
      <p>{textLast}</p>
      <p>{textAhead}</p>
    </div>
  {/if}

  {#if !running}
    <button on:click={render}>Start</button>
  {:else if !paused}
    <button on:click={() => (paused = !paused)}>Pause</button>
  {:else}
    <button on:click={() => (paused = !paused)}>Resume</button>
  {/if}

  {#if !running}
    <div>
      <textarea
        id="text"
        placeholder="insert text here"
        transition:fade
        bind:value={input}
      />
    </div>
  {/if}

  <div class="wpmBox">
    <label for="wpm">words per minute</label>
    <input
      id="wpm"
      type="number"
      bind:value={wpm}
      min="0"
      max="1000"
      step="100"
    />
  </div>
</main>

<style>
  button {
    margin-top: 0.3rem;
    margin-bottom: 1.5rem;
  }

  ::placeholder {
    text-align: center;
  }
  #text,
  #wpm {
    border-radius: 8px;
    border: 1px solid transparent;
    margin-bottom: 1.3rem;
    padding: 0.6em;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  #text:hover,
  #wpm:hover {
    border-color: #646cff;
  }

  #text {
    height: 30px;
    line-height: 30px;
  }

  #wpm {
    width: 3rem;
    text-align: center;
  }

  .wpmBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;
  }

  .textBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    color: gray;
  }
</style>
