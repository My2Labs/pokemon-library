const app = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=173"
const a = document.createElement("a")
const ul = document.querySelector("ul")
ul.append(a)
const p = document.createElement("p")

fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=173")
    .then(response => response.json())
    .then((response) => {
        const pokemonLists = response.results
        const pokemonList = pokemonLists
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })

        return Promise.all(pokemonList)
    }).then(responses => {
        responses.map(response => {
            const pokemonButtons = document.createElement("button")
            const name = `${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}`;
            pokemonButtons.innerHTML = `
                <p>
                    <img src="${response.sprites.front_shiny}" alt="${name}" />
                    <p><a href="pokemon.html?pokemon=${response.id}">${name}</a></p>
                </p>
            `
            return pokemonButtons
        }).forEach(pokeListing => {
            const spinner = document.querySelector(".spinner")
            spinner.classList.add("hidden")
            ul.append(pokeListing)
        })
    })