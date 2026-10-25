import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}

export async function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", async (input) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const cmd = state.commands[words[0]];

    if (!cmd) {
      console.log("Unknown command");
      state.rl.prompt();
      return;
    }

    try {
      await cmd.callback(state, ...words.slice(1));
    } catch (err) {
      console.log(err);
    }

    state.rl.prompt();
  });
}
