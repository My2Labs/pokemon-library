const app = document.querySelector(".pokemon")
const div = document.createElement("div")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=73"
const a = document.createElement("a")
const ul = document.querySelector("ul")
const main = document.querySelector("main")
ul.append(a)
const p = document.createElement("p")



fetch(url)
    .then(response => response.json())
    .then((response) => {
        const sharronsPokemon = response.results
        const myList = sharronsPokemon
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        console.log(myList)
        return Promise.all(myList)
    }).then(whatwasreturned => {
        whatwasreturned.map(response => {
            const fiftyPokemon = document.createElement("button")
            fiftyPokemon.classList = "fifty-pokemon"
            const name = `${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}`;
            fiftyPokemon.innerHTML = `
                            <p>
                                <img src="${response.sprites.front_shiny}" alt="${name}" />
                                <figcaption><a href="pokemon.html?pokemon=${response.id}">${name}</a></figcaption>
                            </p>
                        `
            console.log(fiftyPokemon)
            return fiftyPokemon
        }).forEach(pokemonList => {
            const spinner = document.querySelector(".spinner")
            spinner.classList.add("hidden")
            ul.append(pokemonList)
        })
    })

//THIS CODE ONLY SHOWS ONE POKEMON AT A TIME. 
// const pokeData = {
//     url: `https://pokeapi.co/api/v2/`,
//     type: `pokemon`,
//     ability: `5`,
// }

// li.append(pokeData)

// const { url, type, ability } = pokeData

// const pokeUrl = `${pokeData.url}${pokeData.type}/${pokeData.ability}`

// fetch(pokeUrl)
//     .then((response) => (response.json()))
//     .then((pokeShow) => showPoke(pokeShow))

// const showPoke = (response) => {
//     console.log(response)
//     const html = `
//         <li class="name">
//         <div class="pokeName">${response.name}</div>
//         <img src=${response.sprites.front_default}>
//         <div class="details">Height: ${response.height}
//         Weight: ${response.weight}</div>
//         </li>
//         `
//     const pokemonDiv = document.querySelector(".pokemon")
//     pokemonDiv.innerHTML = html