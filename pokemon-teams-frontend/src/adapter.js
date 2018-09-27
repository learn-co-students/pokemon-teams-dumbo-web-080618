class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  get(path){
    return fetch(path)
    .then(r=>r.json())
  }

  getTrainers(){
    return this.get(this.baseURL + "/trainers")
  }

  createPokemon(id){
    return fetch((this.baseURL + "/pokemons"), {
      method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"trainer_id": id})
    }).then(r=>r.json())

  }
  deletePokemon(pokemon_id){
    return fetch((this.baseURL + "/pokemons/" + pokemon_id), {
      method: "DELETE"
      }).then(r=>r.json())

  }
}
