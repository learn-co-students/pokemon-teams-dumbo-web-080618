const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const pkmnAdapter = new Adapter(POKEMONS_URL)
const trainerAdapter = new Adapter(TRAINERS_URL)
const baseAdapter = new Adapter(BASE_URL)
const main = document.querySelector('main')
document.addEventListener('DOMContentLoaded', function(){
  // alert('connected')
  function renderTrainerCards(trainerObjs){
    trainerObjs.forEach(trainer => {
      // console.log(trainer)
      const newTrainer = new Trainer(trainer, baseAdapter)
      main.append(newTrainer.getTrainerCard())
    })
  }

  trainerAdapter.getAll()
    .then(res => renderTrainerCards(res))

})