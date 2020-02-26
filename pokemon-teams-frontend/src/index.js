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
        console.log("fetch complete!")
        renderTrainerCard(object)
        console.log("Trainer Card rendered with title and add Pokemon button")
    })
}



function renderTrainerCard(object) {
    let main = document.querySelector("main")

    object.data.map(trainer => {
        let card = document.createElement(`div`)

        card.className = "card"
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
        
        resetPokemon(ul, trainer)
        addPokemon(ul, trainer, addPokemonButton)
    })
    // addPokemon(ul, trainer, addPokemonButton)

}

function resetPokemon(ul, trainer) {
    let pokemons = trainer.attributes.pokemons
// need to clear out li's so that I don't get repeats
    console.log(ul)

    pokemons.forEach(pokemon => {
        let li = document.createElement(`li`)
        li.innerText = `${pokemon.species} (${pokemon.nickname})`
        ul.appendChild(li)
        let button = document.createElement(`button`)
        button.setAttribute("data-pokemon-id", `${pokemon.id}`)
        button.className = "release"
        button.innerText = "Release"
        li.appendChild(button)

        removePokemon(pokemon, button)
    })
}

// set event listener for add pokemon
function addPokemon(ul, trainer, button) {
    button.addEventListener("click", function(){

        let configObj = {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              trainer_id: trainer.id
            })
        };
          
        return fetch(POKEMONS_URL, configObj)
        .then(function(response) {
            response.json();
        })
        .then(function(json) {
        resetPokemon(ul, trainer)
        console.log("pokemon added")
        })
    })
}


// set event listener for remove pokemon
function removePokemon(pokemon, button) {
    button.addEventListener("click", function(){

    console.log("pokemon removed")
    console.log(button)
    console.log(pokemon)



    // remove this pokemon from the trainer's relationship database and from the view
    })
}

