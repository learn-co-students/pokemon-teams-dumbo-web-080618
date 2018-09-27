class Adapter{
  constructor(baseURL){
    this.baseURL = baseURL
  }

  getAll(){
    return fetch(this.baseURL)
      .then(res => res.json())
  }
 
  releasePkmn(id){
    return fetch(`${this.baseURL}/pokemons/${id}`, {
      method: 'DELETE',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json" //may only be necessary when 
      }
    })
      .then(res => res.json()
        .then(json => {return json}))
  }
 
  catchPkmn(trainerId){
    return fetch(`${this.baseURL}/pokemons`,{
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({trainer_id: trainerId})
    })
      .then(res => res.json())
  }
}