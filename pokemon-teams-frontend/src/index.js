const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetchTrainers(TRAINERS_URL)
    console.log ("DOM Content Loaded")
})

function fetchPokemon(card, trainer) {
    return fetch(`http://localhost:3000/trainers/${trainer.id}`)
    .then(response => response.json())
    .then(object => {
        trainer = object
        renderSingleCard(card, trainer)
    })
}

function renderSingleCard(card, trainer) {
    clearPokemonList(card)
    resetPokemon(card, trainer.data)
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
            if (trainer.attributes.pokemons.length < 6) {
                addPokemon(card, trainer)
            }
           if (trainer.attributes.pokemons.length >= 6) {
                fetchPokemon(card, trainer)
            }
        })
    })
}

function clearPokemonList(card) {
        card.querySelector("ul").remove()
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

        card.querySelectorAll("button.release").forEach(button => { 
            let pokemonId = button.attributes[0].value
            button.addEventListener("click", function(){
                removePokemon(button, pokemonId, trainer)
            })
        })
}


function addPokemon(card, trainer) {
    console.log(trainer.attributes.pokemons.length)

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
        
        fetch(POKEMONS_URL, configObj) 
            .then(function(response) {
                // response.json();
            })
            .then(function(json) {
                console.log(json)

            fetchPokemon(card, trainer)
            console.log("pokemon added")
        })
    // }
}


function removePokemon(button, pokemonId) {
    let configObj = {
        method: "DELETE",
        headers: 
        {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
    };
    
    fetch(`${POKEMONS_URL}/${pokemonId}`, configObj) 
        .then(function(response) {
            // response.json();
        })
        .then(function(json) {

        button.parentElement.remove()
    })
}


