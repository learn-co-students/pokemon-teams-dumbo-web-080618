class Pokemon{
  constructor(pokemon){
    this.id = pokemon.id
    this.nickname = pokemon.nickname
    this.species = pokemon.species
    this.trainer_id = pokemon.trainer_id
  }

  renderLI(){
    let li = document.createElement("li")
    li.innerHTML = `
      ${this.nickname} (${this.species}) <button class="release" data-pokemon-id=${this.id}>Release</button>
    `
    let releaseBtn = li.querySelector("button");
    releaseBtn.addEventListener('click', (e) => {
      const pokemonAdapter = new Adapter(POKEMONS_URL);
      let id = parseInt(e.target.dataset.pokemonId);
      pokemonAdapter.delete(pokemonAdapter.baseURL, id)
      e.target.parentNode.remove()
    } )
    return li
  }
}
