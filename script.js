// Global Variables
let allPokemon = [];
let filteredPokemon = [];
let currentPage = 1;
const pokemonPerPage = 20;

// DOM Elements
const pokemonGrid = document.getElementById('pokemonGrid');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const typeFilter = document.getElementById('typeFilter');
const genFilter = document.getElementById('genFilter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const modal = document.getElementById('pokemonModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

// Initialize App
async function init() {
    showLoading(true);
    await fetchPokemon(151); // Fetch first 151 Pokemon (Gen 1)
    filteredPokemon = [...allPokemon];
    displayPokemon();
    showLoading(false);
    setupEventListeners();
}

// Show/Hide Loading
function showLoading(show) {
    loading.classList.toggle('active', show);
}

// Fetch Pokemon from PokeAPI
async function fetchPokemon(limit = 151) {
    try {
        const promises = [];
        for (let i = 1; i <= limit; i++) {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
        }
        allPokemon = await Promise.all(promises);
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        pokemonGrid.innerHTML = '<div class="empty-state"><h3>Errore nel caricamento dei Pokémon</h3><p>Riprova più tardi</p></div>';
    }
}

// Display Pokemon Cards
function displayPokemon() {
    const startIndex = (currentPage - 1) * pokemonPerPage;
    const endIndex = startIndex + pokemonPerPage;
    const pokemonToDisplay = filteredPokemon.slice(startIndex, endIndex);

    if (pokemonToDisplay.length === 0) {
        pokemonGrid.innerHTML = '<div class="empty-state"><h3>Nessun Pokémon trovato</h3><p>Prova una ricerca diversa</p></div>';
        return;
    }

    pokemonGrid.innerHTML = pokemonToDisplay.map(pokemon => createPokemonCard(pokemon)).join('');
    
    // Update pagination
    updatePagination();
    
    // Add click listeners to cards
    document.querySelectorAll('.pokemon-card').forEach(card => {
        card.addEventListener('click', () => {
            const pokemonId = parseInt(card.dataset.id);
            showPokemonDetails(pokemonId);
        });
    });
}

// Create Pokemon Card HTML
function createPokemonCard(pokemon) {
    const types = pokemon.types.map(type => 
        `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
    ).join('');

    return `
        <div class="pokemon-card" data-id="${pokemon.id}">
            <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                 alt="${pokemon.name}">
            <div class="pokemon-number">#${String(pokemon.id).padStart(3, '0')}</div>
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-types">${types}</div>
        </div>
    `;
}

// Show Pokemon Details in Modal
async function showPokemonDetails(pokemonId) {
    const pokemon = allPokemon.find(p => p.id === pokemonId);
    if (!pokemon) return;

    // Fetch additional details (species for description)
    let description = "Un meraviglioso Pokémon!";
    try {
        const speciesData = await fetch(pokemon.species.url).then(res => res.json());
        const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
        if (flavorText) {
            description = flavorText.flavor_text.replace(/\f/g, ' ');
        }
    } catch (error) {
        console.error('Error fetching species data:', error);
    }

    const types = pokemon.types.map(type => 
        `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
    ).join('');

    const stats = pokemon.stats.map(stat => {
        const maxStat = 255;
        const percentage = (stat.base_stat / maxStat) * 100;
        return `
            <div class="stat-row">
                <div class="stat-name">${stat.stat.name}</div>
                <div class="stat-value">${stat.base_stat}</div>
            </div>
            <div class="stat-bar">
                <div class="stat-fill" style="width: ${percentage}%"></div>
            </div>
        `;
    }).join('');

    modalBody.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
             alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <div class="pokemon-number">#${String(pokemon.id).padStart(3, '0')}</div>
        <div class="pokemon-types">${types}</div>
        
        <div class="modal-info">
            <p><strong>Descrizione:</strong> ${description}</p>
            <div class="info-row">
                <span class="info-label">Altezza:</span>
                <span>${(pokemon.height / 10).toFixed(1)} m</span>
            </div>
            <div class="info-row">
                <span class="info-label">Peso:</span>
                <span>${(pokemon.weight / 10).toFixed(1)} kg</span>
            </div>
            <div class="info-row">
                <span class="info-label">Abilità:</span>
                <span>${pokemon.abilities.map(a => a.ability.name).join(', ')}</span>
            </div>
        </div>

        <div class="modal-stats">
            <h3>Statistiche Base</h3>
            ${stats}
        </div>
    `;

    modal.style.display = 'block';
}

// Update Pagination Controls
function updatePagination() {
    const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);
    pageInfo.textContent = `Pagina ${currentPage} di ${totalPages}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Filter Pokemon
function filterPokemon() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value;
    const selectedGen = genFilter.value;

    filteredPokemon = allPokemon.filter(pokemon => {
        // Search filter
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm) || 
                            pokemon.id.toString().includes(searchTerm);
        
        // Type filter
        const matchesType = selectedType === 'all' || 
                          pokemon.types.some(type => type.type.name === selectedType);
        
        // Generation filter
        let matchesGen = true;
        if (selectedGen !== 'all') {
            const gen = parseInt(selectedGen);
            if (gen === 1) matchesGen = pokemon.id >= 1 && pokemon.id <= 151;
            else if (gen === 2) matchesGen = pokemon.id >= 152 && pokemon.id <= 251;
            else if (gen === 3) matchesGen = pokemon.id >= 252 && pokemon.id <= 386;
        }

        return matchesSearch && matchesType && matchesGen;
    });

    currentPage = 1;
    displayPokemon();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    searchBtn.addEventListener('click', filterPokemon);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterPokemon();
    });

    // Filters
    typeFilter.addEventListener('change', filterPokemon);
    genFilter.addEventListener('change', async () => {
        const selectedGen = genFilter.value;
        if (selectedGen === '2' && allPokemon.length < 251) {
            showLoading(true);
            await fetchPokemon(251);
            showLoading(false);
        } else if (selectedGen === '3' && allPokemon.length < 386) {
            showLoading(true);
            await fetchPokemon(386);
            showLoading(false);
        }
        filterPokemon();
    });

    // Pagination
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPokemon();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayPokemon();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
