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
    let userHand = [];
    let computerPokemon = [];
    let computerHand = [];
    // shuffle the pokemon using sort() method
    pokeData.results.sort(() => Math.random() - 0.5);
    // Each entry has a .name and a .url property. This url allows you to grab the moves etc of the individual pokemon
    for (let i=0; i<5; i++){
        userPokemon.push(await getPMonStats(pokeData.results[i].url));
        userHand = addToHand(userPokemon[i], userHand);
    }
    // don't need all of the information returned by API. Just need name, HP, attacks & image
    for (entry of userHand) {
        console.table(entry);
    }
    // shuffle the pokemon using sort() method
    pokeData.results.sort(() => Math.random() - 0.5);
    for (let i=0; i<5; i++){
        computerPokemon.push(await getPMonStats(pokeData.results[i].url));
        computerHand = addToHand(computerPokemon[i], computerHand);
    }
    // This shows the above described info for the first pokemon
    for (entry of computerHand) {
        console.table(entry);
    }
    displayHands(userHand, computerHand);
}

async function getPMonStats(theUrl) {
    var statsResponse = await fetch(theUrl);
    // console.log(statsResponse);
    var theStats = await statsResponse.json();
    console.log(theStats);
    return theStats;
}
 /**
  * Function to add excessively bulky data entries' key properties to user hand 
  * @param {*}  
  * @param {*} 
  * @returns 
  */
function addToHand(dataEntry, hand) {
    let attacks = [];
    for (let j=0; j<3; j++) {
        attacks.push(dataEntry.moves[j].move.name);
    }
    hand.push({"name":dataEntry.name,
        "xp":dataEntry.base_experience,
        "attacks":attacks,
        "image":dataEntry.sprites.front_default});
    return hand;
}

function displayHands(userHand, computerHand){
    for (let i=0; i<userHand.length; i++){
        document.getElementsByClassName('userHand')[i].innerHTML = `User Card ${i+1}:
            ${userHand[i].name}
            XP: ${userHand[i].xp}
            attacks: ${userHand[i].attacks[0]}, ${userHand[i].attacks[1]}, ${userHand[i].attacks[2]},
            <img src=${userHand[i].image}>`;
        document.getElementsByClassName('computerHand')[i].innerHTML = `Computer Card ${i+1}:
            ${computerHand[i].name}
            XP: ${computerHand[i].xp}
            attacks: ${computerHand[i].attacks[0]}, ${computerHand[i].attacks[1]}, ${computerHand[i].attacks[2]},
            <img src=${computerHand[i].image}>`;
    }
}

getPokeInfo();