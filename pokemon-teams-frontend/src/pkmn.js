class Pokemon {
  constructor(pkmn){
    this.id = pkmn.id
    this.species = pkmn.species
    this.nickname = pkmn.nickname
    this.trainer_id = pkmn.trainer_id
    this.index_pokemons_on_trainer_id = pkmn.index_pokemons_on_trainer_id
  }

  getPkmnCard(){
    const pkmnCard = `<li>${this.nickname} (${this.species})<button class="release" data-pokemon-id="${this.id}">Release</button></li>`
    return pkmnCard
  }

}

class Trainer {
  constructor(trnr, adapter){
    this.name = trnr.name
    this.id = trnr.id
    this.pokemons = trnr.pokemons
    this.adapter = adapter
  }

  getTrainerCard(){
    const trainerDiv = document.createElement('div')
    trainerDiv.className = 'card'
    trainerDiv.dataset.trainerId = parseInt(`${this.id}`)

    const trainerName = document.createElement('p')
    trainerName.innerText = `${this.name}`
    trainerDiv.appendChild(trainerName)

    const addPkmnButton = document.createElement('button')
    addPkmnButton.dataset.trainerId = parseInt(`${this.id}`)
    addPkmnButton.innerText = 'Add Pokemon'
    addPkmnButton.addEventListener('click', () => this.addPkmn())
    trainerDiv.appendChild(addPkmnButton)

    const pkmnList = document.createElement('ul')
    pkmnList.innerHTML = ""
    this.getMyPkmn().forEach(pkmn => {
      pkmnList.innerHTML += pkmn.getPkmnCard()
    })
    pkmnList.addEventListener('click', (e) => this.releaseMyPkmn(e))
    trainerDiv.appendChild(pkmnList)
    // debugger
    return trainerDiv
  }

  addPkmn(){
    if (this.pokemons.length  > 5){
      alert ("Can't Catch Anymore")
    } else {
      this.adapter.catchPkmn(this.id)
        .then(res => this.addedPkmn(res))
    }
  }

  //cleaned this up, at first it didn't update the object, which was a mistake
  // *REMEMBER: when using OO & the adapter pattern for fetches consider the following
  // -01: object -> does the object relationship reflect what took place?
  // -02: database -> did you fetch properly?
  // -03: html elements -> dependency is nice, but optimistic rendering is nicer, right?
  releaseMyPkmn(e){
    if (e.target.className == 'release'){
      let pkmnId = parseInt(e.target.dataset['pokemonId'])
      this.adapter.releasePkmn(pkmnId)
      this.pokemons = this.pokemons.filter(pkmn => pkmn.id != pkmnId)
      debugger
      e.target.parentNode.remove(e.target.htmlElement)
      console.log(this.pokemons)
    }
  }

  addedPkmn(pokeObj){
    this.pokemons.push(pokeObj)
    const newPkmn = new Pokemon(pokeObj)
    let myDiv = document.querySelector(`div[data-trainer-id="${this.id}"]`)
    debugger
    myDiv.querySelector('ul').innerHTML+=newPkmn.getPkmnCard()
  }


  getMyPkmn(){ 
    const pkmnObjs = this.pokemons.map(pkmn => new Pokemon(pkmn))
    return pkmnObjs
  }
}
