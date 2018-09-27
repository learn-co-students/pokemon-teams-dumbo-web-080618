class Trainer {
  constructor(){

  }
  static trainerDiv (trainerObj){
    let div = document.createElement("div")
    div.className = "card"
    div.dataset.id = trainerObj.id
    div.innerHTML = `<p>${trainerObj.name}</p><button data-trainer-id=${trainerObj.id}>Add Pokemon</button><ul></ul></div>`
  return div
  }

  static addPokemonToTrainer(trainerObj) {
    let div = this.trainerDiv(trainerObj)
    let ul = div.querySelector("ul")
    trainerObj.pokemons.forEach(function(pokemon) {
      let li = document.createElement("li")
      li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button>`
      ul.append(li)
    })
    return div
  }

  static renderTrainer(trainerObj){
    let div = this.addPokemonToTrainer(trainerObj)
    let main = document.querySelector("main")
    main.append(div)
  }






}
