const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const adapter = new Adapter(BASE_URL)
document.addEventListener("DOMContentLoaded", () => {
  adapter.getTrainers().then((trainers) => {
    trainers.forEach(function(trainer) {
      Trainer.renderTrainer(trainer)
    })

    let addPokemonButtons = document.querySelectorAll("div button[data-trainer-id]")
    // let releaseButtons = document.querySelectorAll("div button[data-pokemon-id]")
    let mainEl = document.querySelector("main")
    mainEl.addEventListener("click",(e)=>{
      if(e.target.innerText === "Release"){
        let pokemon_id = e.target.dataset.pokemonId

        adapter.deletePokemon(pokemon_id)
        e.target.parentNode.remove()
      }
    })

    addPokemonButtons.forEach(function(button) {
      button.addEventListener('click', (e)=> {
        let trainer_id = e.target.dataset.trainerId
        adapter.createPokemon(trainer_id)
        .then((r)=>{
              if(r.error != undefined){
                alert(r.error)
              }else {
                let li = document.createElement("li")
                li.innerHTML = `${r.nickname} (${r.species})<button class="release" data-pokemon-id=${r.id}>Release</button>`

                button.parentNode.querySelector("ul").append(li)
              }
              console.log(button)
        })
      })
    })
  })




})
