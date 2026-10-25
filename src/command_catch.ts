import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {
  const name = args[0];
  if (!name) {
    throw new Error("you must provide a pokemon name");
  }

  console.log(`Throwing a Pokeball at ${name}...`);
  const pokemon = await state.pokeAPI.fetchPokemon(name);

  // Higher base experience means a lower chance of catching
  const caught = Math.random() * pokemon.base_experience < 50;

  if (caught) {
    console.log(`${pokemon.name} was caught!`);
    state.pokedex[pokemon.name] = pokemon;
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
