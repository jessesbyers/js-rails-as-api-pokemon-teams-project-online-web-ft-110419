const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    console.log ("DOM Content Loaded")
    fetchTrainers(TRAINERS_URL)
    console.log("trainers fetched")

})

function fetchPokemon(card, trainer) {
    console.log(trainer)
    return fetch(`http://localhost:3000/trainers/${trainer.id}`)
    .then(response => response.json())
    .then(object => {
        console.log(object.data.attributes.pokemons)
        trainer = object
        console.log(trainer)
        renderSingleCard(card, trainer)
    })
}

function renderSingleCard(card, trainer) {
    clearPokemonList(card)
    console.log("card cleared")
    resetPokemon(card, trainer)
    console.log("card reset")
}


function fetchTrainers(url) {
    return fetch(url)
    .then(response => response.json())
    .then(object => {
        renderTrainerCard(object)
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

        resetPokemon(card, trainer)
        addPokemonButton.addEventListener("click", function(){
            addPokemon(card, trainer)
        })
    })
}

function clearPokemonList(card) {
        card.querySelector("ul").remove()
        console.log("ul removed")
}

function resetPokemon(card, trainer) {

    let ul = document.createElement(`ul`)
    pokemons = trainer.attributes.pokemons

        pokemons.slice(0, 6).forEach(pokemon => {
            let li = document.createElement(`li`)
            li.innerText = `${pokemon.species} (${pokemon.nickname})`
            ul.appendChild(li)
            let button = document.createElement(`button`)
            button.setAttribute("data-pokemon-id", `${pokemon.id}`)
            button.className = "release"
            button.innerText = "Release"
            li.appendChild(button)
        })
        card.appendChild(ul)
}


function addPokemon(card, trainer) {
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
    

// something wrong with this syntax...line 108
    return fetch(POKEMONS_URL, configObj) 
        .then(response => response.json())
        .then(json =>  {
        fetchPokemon(card, trainer)

        console.log("pokemon added")
        console.log(json)
    })
}



// set event listener for remove pokemon
// function removePokemon(pokemon, button) {
//     button.addEventListener("click", function(){

//     // console.log("pokemon removed")
//     // console.log(button)
//     // console.log(pokemon)

//     // remove this pokemon from the trainer's relationship database and from the view
//     })
// }

