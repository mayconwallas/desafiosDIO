const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecors = 151;
const limit = 10;
let offset = 0;
let formatoNumberPokemon;

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
        pokemonList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;
    if (qtdRecord >= maxRecors) {
        const newLimit = maxRecors - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
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
        console.log("Valor do item clicado:", idChar);
        abrirModal()
    }
   }) 
});


function abrirModal() {
    const modal = document.getElementById('janelaModal');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janelaModal') {
            modal.classList.remove('abrir');
        }
    })
}





        
    
    // -----forma longa de fazer o map com join----- 
    // const newList = pokemonList.map((pokemon) => {
    //     return convertPokemonToLi(pokemon)
    // })

    // const newHtml = newList.join('');

    
    // ------map na mão----
    // for (let i = 0; i < pokemonList.length; i++) {
    //     const pokemon = pokemonList[i];  
    //     convertPokemonToLi(pokemon);
    //     newListaPokemons.push(convertPokemonToLi (pokemon))
    //     }
        // pokemonOl.innerHTML += newHtml

