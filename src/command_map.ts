import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
  const data = await state.pokeAPI.fetchLocations(
    state.nextLocationsURL ?? undefined,
  );

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const loc of data.results) {
    console.log(loc.name);
  }
}

export async function commandMapBack(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  const data = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const loc of data.results) {
    console.log(loc.name);
  }
}
