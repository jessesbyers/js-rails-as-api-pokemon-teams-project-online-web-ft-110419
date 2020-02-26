const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    console.log ("DOM Content Loaded")
    fetchTrainers(TRAINERS_URL)


})

function fetchTrainers(url) {
    return fetch(url)
    .then(response => response.json())
    .then(object => {
        // console.log(object);
        // console.log(object.data[0])
        console.log("fetch complete!")
        renderTrainerCard(object)
    })
}

function renderTrainerCard(object) {
    console.log("Trainer Card rendered")
    let main = document.querySelector("main")

    object.data.map(trainer => {
        let card = document.createElement(`div.card`)
        card.setAttribute("data-id", `${trainer.id}`)
        main.appendChild(card)

        let p = document.createElement(`p`)
        p.innerText = trainer.attributes.name
        card.appendChild(p)

        let addPokemonButton = document.createElement(`button`)
        addPokemonButton.setAttribute("data-trainer-id", `${trainer.id}`)
        addPokemonButton.innerText = "Add Pokemon"
        card.appendChild(addPokemonButton)

        let ul = document.createElement(`ul`)
        card.appendChild(ul)
        
        // need to create an li for 6 Pokemon with name(nickname) and remove button and append to ul



        console.log(trainer)
        console.log(trainer.attributes.name)
        
    })
}

// set event listener for add pokemon
// set event listener for remove pokemon