const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAIN = document.querySelector("main")


document.addEventListener("DOMContentLoaded", ()=>{
  getIndex();
})

function getIndex(){
  fetch(TRAINERS_URL).then(res => res.json())
    .then(res => {
      res.forEach(function(trainer){
        renderCard(trainer)
      })
    })
}

function renderCard(trainer){
  let card = document.createElement("div")
  card.className += "card "
  card.setAttribute("data-id", trainer.id)
  card.innerHTML = `
  <p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  `
  card.append(renderPokemonList(trainer))

  let addButton = card.querySelector(`button`)
  addButton.addEventListener("click", function(){
    post_pokemon(trainer.id).then(res => {
      if(!res.error){
        let ul = card.querySelector(`#ul-${trainer.id}`)
        ul.append(renderPokemon(res))
      }
    })
  })
  MAIN.append(card)
}

function renderPokemonList(trainer){
  let pokemon_list = document.createElement("ul")
  pokemon_list.id = `ul-${trainer.id}`
  trainer.pokemons.forEach(function(pokemon){
    pokemon_list.append(renderPokemon(pokemon))
  })
  return pokemon_list
}

function renderPokemon(pokemon){
  let pokemonli = document.createElement("li")
  pokemonli.innerHTML = `
  ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
  `
  let removeButton = pokemonli.querySelector('.release')
  removeButton.addEventListener("click", function(){
    delete_pokemon(pokemon).then(res => {
      pokemonli.parentElement.removeChild(pokemonli)
    })
  })
  return pokemonli;
}

function postData(trainer){
  return{
  "trainer_id":trainer
  }
}

function post_pokemon(trainer){
  return fetch(POKEMONS_URL,{
    method: "POST",
    headers: {
            "Content-Type": "application/json",
        },
    body: JSON.stringify(postData(trainer)),
  }).then(response => response.json());
}

function delete_pokemon(pokemon){
  return fetch(`${POKEMONS_URL}/${pokemon.id}`,{
    method: "DELETE",
  }).then(response => response.json());
}
