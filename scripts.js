// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const pokemonSelect = document.getElementById('pokemon-select');
    const fetchDataBtn = document.getElementById('fetch-data-btn');
    const dataContainer = document.getElementById('data-container');

    // Fetch data from the Pokémon API
    fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(response => response.json())
        .then(data => {
            // Populate dropdown with Pokémon names and URLs
            data.results.forEach(pokemon => {
                const option = document.createElement('option');
                option.text = pokemon.name;
                option.value = pokemon.url;
                pokemonSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
            dataContainer.textContent = 'Error fetching Pokémon data. Please try again later.';
        });

    // Event listener for button click
    fetchDataBtn.addEventListener('click', function () {
        const selectedPokemonUrl = pokemonSelect.value;

        if (selectedPokemonUrl) {
            fetch(selectedPokemonUrl)
                .then(response => response.json())
                .then(pokemon => {
                    // Clear previous data
                    dataContainer.innerHTML = '';
                    
                    // Display fetched Pokémon details
                    const pokemonDetails = `
                        <h2>${pokemon.name}</h2>
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <p>Height: ${pokemon.height}</p>
                        <p>Weight: ${pokemon.weight}</p>
                    `;
                    dataContainer.innerHTML = pokemonDetails;
                })
                .catch(error => {
                    console.error('Error fetching Pokémon details:', error);
                    dataContainer.textContent = 'Error fetching Pokémon details. Please try again later.';
                });
        } else {
            console.error('No Pokémon selected.');
            dataContainer.textContent = 'No Pokémon selected. Please select a Pokémon first.';
        }
    });
});