const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const maxRecors = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
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

