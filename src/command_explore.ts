import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const name = args[0];
  if (!name) {
    throw new Error("you must provide a location name");
  }

  console.log(`Exploring ${name}...`);
  const location = await state.pokeAPI.fetchLocation(name);

  console.log("Found Pokemon:");
  for (const enc of location.pokemon_encounters) {
    console.log(` - ${enc.pokemon.name}`);
  }
}
