// Trying out pokemon API
// Returns data which contains names of individual pokemon, from which a link to their api profile is available
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';

async function getPokeInfo() {
    // Get list of pokemon
    const response = await fetch(baseUrl);
    console.log(response);
    // This contains pokeData.results which has entries for each pokemon
    const pokeData = await response.json();
    console.log(pokeData);
    // This is essentially a user/computer's hand
    let userPokemon = [];
    let computerPokemon = [];
    // Each entry has a .name and a .url property. This url allows you to grab the moves etc of the individual pokemon
    for (let i=0; i<5; i++){
        userPokemon.push(await getPMonStats(pokeData.results[i].url));
    }
    // shuffle the pokemon using sort() method
    pokeData.results.sort(() => Math.random() - 0.5);
    for (let i=0; i<5; i++){
        computerPokemon.push(await getPMonStats(pokeData.results[i].url));
    }
    // This shows the above described info for the first pokemon
    console.log(userPokemon[0]);
    console.log(computerPokemon[0]);
    // Trying to access the move & its url
    for (character of userPokemon) {
        console.log(character.sprites.front_default);
        console.log(character.moves[0].move);
        console.log(`First userPokemon has health of ${character.stats[0].base_stat}`);
    }
    for (character of computerPokemon) {
        console.log(character.sprites.front_default);
        console.log(character.moves[0].move);
        console.log(`First computerPokemon has health of ${character.stats[0].base_stat}`);
    }
    // Get what the move does using its api url
    // let moves = [];
    // moves.push(await getPMonStats(pokemon[0].moves[0].move.url));
    // console.log(moves[0].damage_class.url);
    // console.log(await getPMonStats(moves[0].damage_class.url));
    // console.log(moves[0].damage_class.url);
}

async function getPMonStats(theUrl) {
    var statsResponse = await fetch(theUrl);
    console.log(statsResponse);
    var theStats = await statsResponse.json();
    console.log(theStats);
    return theStats;
}

getPokeInfo();