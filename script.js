const allPokemons = [];
let loadedPokemons = 0;

async function getPokemonData() {
    for (let indexPokemon = 1; indexPokemon <= 20; indexPokemon++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${indexPokemon}`);
        let responseAsJson = await response.json();
        allPokemons.push(responseAsJson);
    }
    renderCards();
}

async function loadMorePokemons() {
  const startIndex = loadedPokemons + 1;
  const endIndex = loadedPokemons + 20;

  for (let indexPokemon = startIndex; indexPokemon <= endIndex; indexPokemon++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${indexPokemon}`);
    const responseAsJson = await response.json();
    allPokemons.push(responseAsJson);
  }
}

function renderMoreCards() {
  const cardContent = document.getElementById('cardOverview');
  const startIndex = loadedPokemons;

  for (let indexCard = startIndex; indexCard < allPokemons.length; indexCard++) {
    const pokemon = allPokemons[indexCard];
    const imgHome = pokemon.sprites.other.home.front_default;
    const nameCap = capitalize(pokemon.species.name);

    cardContent.innerHTML += getTemplateCardOverview(indexCard, nameCap, imgHome, pokemon);
    addTypesToCardOverview(indexCard);
  }
  loadedPokemons = allPokemons.length;
  loadMorePokemons();
  checkLoadMoreButton();
}

function renderCards() {
    const cardContent = document.getElementById('cardOverview');
    cardContent.innerHTML = "";

    for (let indexCard = 0; indexCard < allPokemons.length; indexCard++) {
        const pokemon = allPokemons[indexCard];
        const imgHome = pokemon.sprites.other.home.front_default;

        const nameCap = capitalize(pokemon.species.name);

        cardContent.innerHTML += getTemplateCardOverview(indexCard, nameCap, imgHome, pokemon);
        addTypesToCardOverview(indexCard);
    }
    loadedPokemons = allPokemons.length;
    loadMorePokemons();
}

function addTypesToCardOverview(indexCard) {
    const cardTypeContent = document.getElementById(`typeOverview${indexCard}`);

    for (let indexTypes = 0; indexTypes < allPokemons[indexCard].types.length; indexTypes++) {
        const type = allPokemons[indexCard].types[indexTypes].type.name;
        cardTypeContent.innerHTML += getTemplateCardTypes(indexCard, indexTypes, type)
    }
}

function checkLoadMoreButton() {
  const button = document.getElementById('loadMoreBtn');
  if (loadedPokemons >= 50) {
    button.disabled = true;
    button.textContent = "no more Pokémon available";
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function openPokemonInfo(indexCard) {
    const currentPokemon = indexCard;
    const pCardDialog = document.getElementById('pInfoDialog')
    pCardDialog.showModal();
    pCardDialog.classList.add("opened");
}

// function openGalleryFullsize(i) {
//   currentI = i;
//   const galleryFullsize = document.getElementById("galleryFullsize");
//   galleryFullsize.innerHTML = galleryFullsizeContent(i);
//   galleryFullsize.showModal();
//   galleryFullsize.classList.add("opened");
// }