class PokemonTrainer{
  constructor(trainer){
    this.id = trainer.id
    this.name = trainer.name
    this.pokemons = trainer.pokemons
  }

  renderTrainerCard(){
    const mainTag = document.getElementsByTagName("main")[0]
    let card = document.createElement("div")
    card.className = "card"
    card.dataset.id = this.id

    card.innerHTML = `
      <p>${this.name}</p>
      <button data-trainer-id=${this.id}>Add Pokemon</button>
    `
    let ul = document.createElement('ul')
    this.pokemons.forEach(function(pokemon){
      let pokemonObj = new Pokemon(pokemon)
      let li = pokemonObj.renderLI()
      ul.appendChild(li)
    })
    card.appendChild(ul);
    mainTag.appendChild(card)
    return card

  }

}
