const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {

  const trainerAdapter = new Adapter(TRAINERS_URL);
  const pokemonAdapter = new Adapter(POKEMONS_URL);

  trainerAdapter.get(trainerAdapter.baseURL)
    .then((trainers) => {
      trainers.forEach(function(trainer){
        let trainerObj = new PokemonTrainer(trainer);
        let card = trainerObj.renderTrainerCard();
        let addPokeBtn = card.querySelector("button")
        addPokeBtn.addEventListener('click', addPokemon)
      })
    })


    function addPokemon(e){
      let trainerId = e.target.dataset.trainerId
      trainerAdapter.get(trainerAdapter.baseURL)
        .then((trainers) => {
          let trainer = trainers.find(function(trainer){
            return trainer.id === parseInt(trainerId)
          })
          if (trainer.pokemons.length < 6){
            let data = {trainer_id : trainer.id}
            pokemonAdapter.post(pokemonAdapter.baseURL, data)
              .then((poke) => {
                let pokemonObj = new Pokemon(poke)
                let li = pokemonObj.renderLI()
                let cards = document.getElementsByClassName("card")
                for (let i = 0; i < cards.length; i++){
                  if (parseInt(cards[i].dataset.id) === data.trainer_id){
                    let ul = cards[i].querySelector('ul')
                    ul.appendChild(li)
                  }
                }
              })
          }

        })
    }

})
