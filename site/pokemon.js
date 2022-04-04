const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const main = document.querySelector("main")
const body = document.querySelector("body")

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => response.json())
    .then(response => {
        const name = `${response.name[0].toUpperCase()}${response.name.slice(1)}`;
        const title = document.querySelector("title");
        title.textContent = name;
        const pokemonDetails = document.createElement("div")
        pokemonDetails.classList = "pokemon-details"
        pokemonDetails.innerHTML = `
            <figure>
                <img src="${response.sprites.front_shiny}" alt="${name}" />
                <figcaption>${name}</figcaption>
            </figure>
        `;
        main.append(pokemonDetails);
        const abilityRequests = response.abilities
            .map(response => response.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(abilityRequests)
    }).then(responses => {
        const ul = document.createElement("ul")
        const h3 = document.createElement("h3")
        h3.textContent = "Abilities"
        ul.append(h3)
        ul.classList = "abilities"
        body.append(ul)
        responses.map(response => {
            const li = document.createElement("li")
            li.innerHTML = `
                <span class="ability-name">${response.name[0].toUpperCase()}${response.name.slice(1)}</span>
                <span class="ability-description">${response.effect_entries[1].short_effect}</span> 
                `
            return li;

        }).forEach(li => {
            ul.append(li)
        })
        const spinner = document.querySelector(".spinner")
        spinner.classList.add("hidden")
    })