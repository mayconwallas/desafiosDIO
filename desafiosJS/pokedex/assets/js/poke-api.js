const pokeApi = {};

function convertPokemonApiDetailToPokemon(pokeDetail) {
    // console.log(pokeDetail)
    
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.number}.gif`;

    /*1 mudança relevante*/
    const ataques = pokeDetail.moves.map((teste) => teste.move.name)
    pokemon.ataques = ataques;

    //console.log(ataques)

    /* mudança que gera o erro*/
    // for (let j = 0; j < 6; j++) {
    //     pokemon.ataques.push(pokeDetail.moves[j].move.name);
    // }

    return pokemon;
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokemonApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {   
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequesets) => Promise.all(detailRequesets))
    .then((pokemonsDetails) => pokemonsDetails)
}