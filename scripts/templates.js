function getTemplateCardOverview(indexCard, nameCap, imgHome, pokemon) {
    return `
        <section onclick="openPokemonInfo(${indexCard})" id="CardOverview${indexCard}" class="card pCard ${pokemon.types[0].type.name}Type">
            <div class="pId">
              <p id="idOverview${indexCard}" class="t-center"># ${indexCard + 1}</p>
            </div>
            <div id="pokeImgOverview${indexCard}" class="pCardImg">
              <img src="${imgHome}" alt="picture of ${nameCap}" />
            </div>
            <h2 id="pokeNameOverview${indexCard}">${nameCap}</h2>
            <section id="typeOverview${indexCard}" class="pCardTypes"></section>
        </section>`;
}

function getTemplateCardTypes(indexCard, indexTypes, type) {
    return `
            <div class="tooltip pCardTypes" id="ttTypeInfoCard${indexCard}-${indexTypes}">
                          <img src="./assets/icons/types/${type}.png" alt="Icon of type ${type}" class="type"/>
                          <span class="tooltiptext bg-${type}">${type}</span>
                        </div>`;
}

