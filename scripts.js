// Define an asynchronous function to fetch Pokémon data
async function fetchPokemonData(pokemonUrl) {
    try {
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const pokemonSelect = document.getElementById('pokemon-select');
    const fetchDataBtn = document.getElementById('fetch-data-btn');
    const dataContainer = document.getElementById('data-container');

    // Function to populate the dropdown list with Pokémon names and URLs
    async function populatePokemonDropdown() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const data = await response.json();
            data.results.forEach(pokemon => {
                const option = document.createElement('option');
                option.text = pokemon.name;
                option.value = pokemon.url;
                pokemonSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            dataContainer.textContent = 'Error fetching Pokémon data. Please try again later.';
        }
    }

    // Invoke the function to populate the dropdown list on page load
    populatePokemonDropdown();

    // Event listener for button click to fetch Pokémon details
    fetchDataBtn.addEventListener('click', async function () {
        const selectedPokemonUrl = pokemonSelect.value;

        if (selectedPokemonUrl) {
            try {
                const pokemonData = await fetchPokemonData(selectedPokemonUrl);
                // Clear previous data
                dataContainer.innerHTML = '';
                // Display fetched Pokémon details
                const pokemonDetails = `
                    <h2>${pokemonData.name}</h2>
                    <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <p>Height: ${pokemonData.height}</p>
                    <p>Weight: ${pokemonData.weight}</p>
                `;
                dataContainer.innerHTML = pokemonDetails;
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
                dataContainer.textContent = 'Error fetching Pokémon details. Please try again later.';
            }
        } else {
            console.error('No Pokémon selected.');
            dataContainer.textContent = 'No Pokémon selected. Please select a Pokémon first.';
        }
    });
});

