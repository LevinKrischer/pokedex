const allPokemons = [];
let allNames = [];
const pCardDialog = document.getElementById("pInfoDialog");
let loadedPokemons = 0;
let currentCategory = "Basic";
let currentPokemon = 0;

async function getPokemonData() {
  showLoadingScreen();
  for (let indexPokemon = 1; indexPokemon <= 20; indexPokemon++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${indexPokemon}`);
    let responseAsJson = await response.json();
    allPokemons.push(responseAsJson);
  }
  hideLoadingScreen();
  renderCards();
  showLoadMoreBtn();
  pushNamesIntoArr();
}

async function loadMorePokemons() {
  showLoadingScreen();
  disabledLoadMoreButton();
  const startIndex = loadedPokemons + 1;
  const endIndex = loadedPokemons + 20;

  for (let indexPokemon = startIndex; indexPokemon <= endIndex; indexPokemon++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${indexPokemon}`);
    const responseAsJson = await response.json();
    allPokemons.push(responseAsJson);
  }

  hideLoadingScreen();
  enableLoadMoreButton();
  renderMoreCards();
  pushNamesIntoArr();
}

function showLoadMoreBtn() {
  const loadButton = document.getElementById('loadMoreBtn');
  loadButton.classList.remove("loadBtn");
}

function hideLoadMoreBtn() {
  const loadButton = document.getElementById('loadMoreBtn');
  loadButton.classList.add("loadBtn");
}


function disabledLoadMoreButton() {
  const loadButton = document.getElementById('loadMoreBtn');
  loadButton.disabled = true;
}

function enableLoadMoreButton() {
  const loadButton = document.getElementById('loadMoreBtn');
  loadButton.disabled = false;
}

function showLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen')
  loadingScreen.classList.remove('dNone');
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen')
  loadingScreen.classList.add('dNone');
}

function pushNamesIntoArr() {
  allNames.length = 0;

  for (let indexName = 0; indexName < allPokemons.length; indexName++) {
    const name = allPokemons[indexName].species.name;
    allNames.push(name);
  }
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
  checkLoadMoreButton();
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

function openPokemonInfo(indexCard) {
  currentPokemon = indexCard;
  pCardDialog.showModal();
  pCardDialog.classList.add("opened");
  pCardDialog.innerHTML = getTemplateInformation();
  loadBasicInformation(currentPokemon);
  checkPrevAvailable();
  checkNextAvailable();
}

function closeDialog() {
  pCardDialog.close();
  pCardDialog.classList.remove("opened");
  currentCategory = "Basic";
}

function loadBasicInformation() {
  loadBackgroundColorPCard();
  loadIdPCard();
  loadNamePCard();
  loadTypesPCard();
  loadImgPCard();
  loadInformationIntoPCard();
  setCurrentPageInDialog();
}

function loadBackgroundColorPCard() {
  const type = allPokemons[currentPokemon].types[0].type.name
  document.getElementById('pInfoCard').classList.add(`${type}TypeInfo`)
}

function loadIdPCard() {
  const id = currentPokemon + 1;
  document.getElementById('pIdInfoCard').innerHTML = `# ${id}`;
}

function loadNamePCard() {
  const nameCap = capitalize(allPokemons[currentPokemon].species.name);
  document.getElementById('pNameInfoCard').innerHTML = `${nameCap}`;
}

function loadTypesPCard() {
  const pCardTypeContent = document.getElementById(`ttTypeInfoCard`);
  pCardTypeContent.innerHTML = "";

  for (let indexTypes = 0; indexTypes < allPokemons[currentPokemon].types.length; indexTypes++) {
    const types = allPokemons[currentPokemon].types[indexTypes].type.name
    pCardTypeContent.innerHTML += getTemplatePCardTypes(types);
  }
}

function loadImgPCard() {
  const imgHome = allPokemons[currentPokemon].sprites.other.home.front_default;
  const nameCap = capitalize(allPokemons[currentPokemon].species.name);
  document.getElementById('pCardImg').innerHTML = getTemplateImgHome(imgHome, nameCap);
}

function showStatsInformation() {
  const infoRowContent = document.getElementById(`infoRowContent`);
  infoRowContent.innerHTML = "";
  infoRowContent.innerHTML += getTemplatePCardStats();
  currentCategory = "Stats";
  setCategoryOnActive();
}

function setCurrentPageInDialog() {
  const currentPage = document.getElementById('currentPage');
  currentPage.innerHTML = currentPokemon + 1;
}

function loadInformationIntoPCard() {
  if (currentCategory === "Basic") {
    showBasicInformation();
    loadAbilitiesInformationIntoPCard();
  } else if (currentCategory === "Stats") {
    showStatsInformation();
  } else if (currentCategory === "Attacks") {
    showAttacksInformation();
  } else if (currentCategory === "Forms") {
    showPokemonForms();
  } else return;
}

function showAttacksInformation() {
  const infoRowContent = document.getElementById(`infoRowContent`);
  infoRowContent.innerHTML = "";

  for (let indexAttacks = 0; indexAttacks < allPokemons[currentPokemon].moves.length; indexAttacks++) {
    const attack = allPokemons[currentPokemon].moves[indexAttacks].move.name;
    const level = allPokemons[currentPokemon].moves[indexAttacks].version_group_details[0].level_learned_at;
    infoRowContent.innerHTML += getTemplatePCardAttacks(attack, level);
  }

  currentCategory = "Attacks";
  setCategoryOnActive();
}

function showPokemonForms() {
  const shinyImg = allPokemons[currentPokemon].sprites.other.home.front_shiny;
  const artworkImg = allPokemons[currentPokemon].sprites.other["official-artwork"].front_default;
  const gifImg = allPokemons[currentPokemon].sprites.versions["generation-v"]["black-white"].animated.front_default;
  const infoRowContent = document.getElementById(`infoRowContent`);
  infoRowContent.innerHTML = "";
  infoRowContent.innerHTML = getTemplatePCardForms(shinyImg, artworkImg, gifImg);
  currentCategory = "Forms";
  setCategoryOnActive();
}


function showBasicInformation() {
  const infoRowContent = document.getElementById(`infoRowContent`);
  const nameCap = capitalize(allPokemons[currentPokemon].species.name)
  infoRowContent.innerHTML = "";
  infoRowContent.innerHTML = getTemplatePCardBasics(nameCap);
  currentCategory = "Basic";
  setCategoryOnActive();
}

function loadAbilitiesInformationIntoPCard() {
  const pCardAbilitiesContent = document.getElementById(`pokeAbilitiesValueInfoCard`);
  pCardAbilitiesContent.innerHTML = "";

  for (let indexAbilities = 0; indexAbilities < allPokemons[currentPokemon].abilities.length; indexAbilities++) {
    const abilities = allPokemons[currentPokemon].abilities[indexAbilities].ability.name;
    pCardAbilitiesContent.innerHTML += getTemplatePCardAbilities(abilities);
  }
}

function setCategoryOnActive() {
  removeCategoryActive();
  addCategoryActive();
}

function removeCategoryActive() {
  const categories = document.querySelectorAll('.categoryBtn');

  for (let i = 0; i < categories.length; i++) {
    categories[i].classList.remove('active');
  }
}

function addCategoryActive() {

  if (currentCategory === "Basic") {
    document.getElementById('categoryBtnBasicInfoCard').classList.add('active');
  } else if (currentCategory === "Stats") {
    document.getElementById('categoryBtnBaseStatsInfoCard').classList.add('active');
  } else if (currentCategory === "Attacks") {
    document.getElementById('categoryBtnAttacksInfoCard').classList.add('active');
  } else if (currentCategory === "Forms") {
    document.getElementById('categoryBtnFormsInfoCard').classList.add('active');
  };
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

pCardDialog.addEventListener("click", (event) => {
  if (event.target === pCardDialog) {
    closeDialog();
  }
});

function nextPokemonPCard() {
  if (currentPokemon < allPokemons.length - 1) {
    currentPokemon++;
    loadBasicInformation();
  }

  checkPrevAvailable();
  checkNextAvailable();
}

function prevPokemonPCard() {
  if (currentPokemon > 0) {
    currentPokemon--;
    loadBasicInformation();
  }

  checkNextAvailable();
  checkPrevAvailable();
}

function checkNextAvailable() {
  const nextButton = document.getElementById('pageSelectorBtnNext');
  
  if (currentPokemon == allPokemons.length - 1) {
    nextButton.classList.add('dNone');
  } else {
    nextButton.classList.remove('dNone');
  }
}

function checkPrevAvailable() {
  const prevButton = document.getElementById('pageSelectorBtnPrev');
  
  if (currentPokemon == "0") {
    prevButton.classList.add('dNone');
  } else {
    prevButton.classList.remove('dNone');
  }
}


function searchForPokemon() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();

  if (searchInput.length >= 3) {
    for (let nameIndex = 0; nameIndex < allNames.length; nameIndex++) {
      const name = allNames[nameIndex];
      const card = document.getElementById(`cardOverview${nameIndex}`);

      if (name.includes(searchInput)) {
        card.classList.remove('dNone');
      } else {
        card.classList.add('dNone');
      }
    }

  } else {
    for (let nameIndex = 0; nameIndex < allNames.length; nameIndex++) {
      const card = document.getElementById(`cardOverview${nameIndex}`);
      card.classList.remove('dNone');
    }
  }
  document.getElementById('deleteSearchInput').classList.add('show');
  hideLoadMoreBtn();
}

function deleteSearchInput() {
  document.getElementById('searchInput').value = "";
  searchForPokemon();
  document.getElementById('deleteSearchInput').classList.remove('show');
  showLoadMoreBtn();
}

// function toggleSearchMobileBar() {
//   const mobileSearchBtn = document.getElementById('searchMobile')
//   mobileSearchBtn.classList.toggle("show");
// }