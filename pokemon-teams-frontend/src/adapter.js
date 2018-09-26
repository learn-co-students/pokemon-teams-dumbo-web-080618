class Adapter{

  constructor(baseURL){
    this.baseURL = baseURL
  }

  // use this to get /trainers
  // get all trainers & pokemons
  get(path){
    return fetch(path).then(res => res.json())
  }

  // use this to post/pokemon
  // and add a pokemon
  post(path, data){
    return fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
  }

  // use this to release a pokemon
  //delete a pokemon at /pokemons/:pokemon_id
  delete(path, id){
    let url = path + `/${id}`
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    })
    .then(response => response.json())
  }


}
