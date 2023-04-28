const getSinglePoke = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const result = await response.json();
  console.log("result", result.name);
  return result.name;
};

// getSinglePoke(10);

const getAllPokemons = async (maxAmount) => {
  const allPokes = [];
  console.time("without_PromiseAll");
  for (let i = 0; i < maxAmount; i++) {
    const singlePoke = await getSinglePoke(i + 1);
    allPokes.push(singlePoke);
  }
  console.timeEnd("without_PromiseAll");
  console.log("allPokes", allPokes);
};

const getAllPokemonsFast = async (maxAmount) => {
  const allPokesPromises = [];
  console.time("PromiseAll");

  for (let i = 0; i < maxAmount; i++) {
    const singlePoke = getSinglePoke(i + 1);
    allPokesPromises.push(singlePoke);
  }
  console.timeEnd("PromiseAll");

  // console.log("allPokesPromises", allPokesPromises);
  const allPokes = await Promise.all(allPokesPromises);
  console.log("allPokes", allPokes);
};

getAllPokemons(100);
getAllPokemonsFast(100);
