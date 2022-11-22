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
  let wpm = 400;

  function handleKeydown(event) {
    if (event.code == "Space") {
      paused = !paused;
    }
  }

  async function render() {
    if (input == "") {
      input = "insert text!";
      return;
    }

    paused = false;
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

<svelte:window on:keydown={handleKeydown} />

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
      <textarea id="text" placeholder="insert text here" bind:value={input} />
    </div>
  {/if}

  <div>
    <label for="wpm">words per minute </label>
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
    height: 30px;
    line-height: 30px;
  }
  #text,
  #wpm {
    border-radius: 8px;
    border: 1px solid transparent;
    margin-bottom: 1.3rem;
    padding: 0.6em;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  #text:hover,
  #wpm:hover {
    border-color: #646cff;
  }

  #wpm {
    width: 3rem;
    margin-left: 0.4rem;
  }
</style>
