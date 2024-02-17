const pokemonList = document.getElementById('pokemonList');
const pokemonModalDetalhe = document.getElementById("pokemonListDetail");
const loadMoreButton = document.getElementById('loadMoreButton');
const backButton = document.getElementById('backButton');
const maxRecors = 151;
const limit = 9;
let offset = 0;
let formatoNumberPokemon;
let idChar = 0;
let isFirstLoad = true; 

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" value="${pokemon.number}">
            <span class="number"><button class="buttonTypes ${pokemon.type}"" value="${pokemon.number}" >${formatoNumeroPokemon(pokemon) + pokemon.number}</button></span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}<li>`).join('')}
                </ol>
    
                <img src="${pokemon.photo}" 
                     alt="${pokemon.name}">
            </div>
        </li>
        `).join('');
        pokemonList.innerHTML = newHtml
    })

}

function loadPokemonModalDetalhe(idChar) {
    const teste = pokeApi.getPokemons(idChar - 1, 1).then((pokemons = []) => {
      const Html = pokemons
        .map(
          (pokemon) =>
            `<li class="pokemon ${pokemon.type}">
              <span class="number">${
                formatoNumeroPokemon(pokemon) + pokemon.number
              }</span>
              <span class="name">${pokemon.name}</span>
              <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}<li>`)
                    .join("")}
              </ol>
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
                    pokemon.number
                  }.gif" alt="">
              </div>
              <div class="info">
                  <ul class="types">
                      <h2>ataques</h2>
                      <li class="liInfo">${testeFor(pokemon)}<li>
                  </ul>
              </div>
          </li>`
        )
        .join("");
  
        pokemonModalDetalhe.innerHTML = Html;
    });
  }

function testeFor(pokemon) {
    const ataque = []
    for (let i = 0; i < 6; i++) {
      ataque.push(pokemon.ataques[i]) 
    } 
    return ataque.join('</br>')
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;
    if (qtdRecord >= maxRecors) {
        const newLimit = maxRecors - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.style.display = 'none';
    } else {
        loadPokemonItens(offset, limit);
    }

    if (isFirstLoad) {
        isFirstLoad = false;
        backButton.style.display = 'inline';
    }

})

backButton.addEventListener('click', () => {
    offset -= limit;
    const qtdRecord = offset + limit;
    loadMoreButton.style.display = 'inline';
    if (offset <= 0) {
        backButton.style.display = 'none';
        isFirstLoad = true;
    }
    
    if (qtdRecord >= maxRecors) {
        const newLimit = maxRecors - offset
        loadPokemonItens(offset, newLimit);
    } else {
        loadPokemonItens(offset, limit);
    }

})

function formatoNumeroPokemon(pokemon) {
    let formatoNumberPokemon; 
    if (pokemon.number >= 1 && pokemon.number <= 9) {
        formatoNumberPokemon = "#00"
    } else if (pokemon.number >=10 && pokemon.number <= 99) {
        formatoNumberPokemon = "#0"
    } else {
        formatoNumberPokemon = "#"
    }

    return formatoNumberPokemon
}

//-------------- Modificações --------------

document.addEventListener("DOMContentLoaded", function() {
   const pokeLista = document.getElementById("pokemonList");
   pokeLista.addEventListener("click", function(e) {
    if(e.target.tagName === "BUTTON") {
        const idChar = e.target.getAttribute("value");
        //console.log(numCharPokemon(idChar))
        loadPokemonModalDetalhe(idChar);
        abrirModal()
    }
   }) 
});


function abrirModal() {
    const modal = document.getElementById('janelaModal');
    modal.classList.add('abrir');
    //console.log(convertPokemonApiDetailToPokemon());
    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janelaModal') {
            modal.classList.remove('abrir');
        }
    })
}

// https://pokeapi.co/api/v2/pokemon/1

function numCharPokemon(numeroPokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
            console.log(error.error);
        })
}