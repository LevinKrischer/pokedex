function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkNextAvailable() {
    const nextButton = document.getElementById('pageSelectorBtnNext');

    if (currentPokemon == currentData.length - 1) {
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

window.onscroll = function () {
    showGoTopButton();
};

function bodyDeactivateScrolling() {
    const body = document.getElementById('body');
    body.classList.add('noScroll')
}

function bodyActivateScrolling() {
    const body = document.getElementById('body');
    body.classList.remove('noScroll')
}

function showNoResultMessage() {
    messageContainer = document.getElementById('emptySearchResultMessage');
    messageContainer.classList.add('show', 'flex-col');
}

function hideNoResultMessage() {
    messageContainer = document.getElementById('emptySearchResultMessage');
    messageContainer.classList.remove('show', 'flex-col');
}

function loadMorePokemonEmptyResult() {
    document.getElementById('searchInput').value = "";
    hideNoResultMessage();
    resetOverview();
    loadMorePokemons();
}
