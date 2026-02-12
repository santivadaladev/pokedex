# 🎮 Pokédex - Web App Portfolio Project

Una moderna applicazione web Pokédex che utilizza la PokeAPI per visualizzare informazioni dettagliate su tutti i Pokémon. Progetto perfetto per dimostrare competenze in HTML, CSS, JavaScript e integrazione API.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Funzionalità

- **🔍 Ricerca avanzata**: Cerca Pokémon per nome o numero
- **🎨 Filtri multipli**: Filtra per tipo e generazione
- **📊 Dettagli completi**: Visualizza statistiche, abilità, altezza e peso
- **💫 Animazioni fluide**: Transizioni e hover effects professionali
- **📱 Design responsive**: Perfettamente funzionante su mobile e desktop
- **🎯 Paginazione**: Navigazione facile tra centinaia di Pokémon
- **🌈 Type colors**: Ogni tipo ha il suo colore distintivo
- **⚡ Performance**: Caricamento asincrono e ottimizzato

## 🚀 Demo Live

[Vedi Demo](https://tuousername.github.io/pokedex) *(sostituisci con il tuo link GitHub Pages)*

## 📸 Screenshot

*(Aggiungi qui degli screenshot della tua applicazione)*

## 🛠️ Tecnologie Utilizzate

- **HTML5**: Struttura semantica e accessibile
- **CSS3**: 
  - Flexbox e Grid per layout responsive
  - Animazioni e transizioni CSS
  - Gradients e box-shadows avanzati
  - Custom properties (CSS variables)
- **JavaScript (Vanilla)**:
  - Async/Await per chiamate API
  - Promise.all per richieste parallele
  - Event delegation
  - DOM manipulation
- **PokeAPI**: REST API pubblica per dati Pokémon

## 📦 Installazione e Utilizzo

### Metodo 1: Apertura Diretta
1. Scarica tutti i file del progetto
2. Apri `index.html` nel tuo browser

### Metodo 2: Server Locale
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve

# Con Live Server (VS Code extension)
# Click destro su index.html → "Open with Live Server"
```

Poi visita: `http://localhost:8000`

## 🎯 Come Funziona

### 1. Fetch dei Dati
```javascript
// Caricamento parallelo di 151 Pokémon (Gen 1)
const promises = [];
for (let i = 1; i <= 151; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`));
}
const data = await Promise.all(promises);
```

### 2. Filtraggio e Ricerca
- Ricerca real-time per nome/numero
- Filtro per 18 tipi diversi
- Selezione generazione (1-3)

### 3. Modal Dinamico
- Click su card per dettagli completi
- Statistiche visualizzate con barre progress
- Chiusura con X, click esterno o ESC

## 📊 Competenze Dimostrate

✅ **API Integration**: Consumo di REST API con fetch()  
✅ **Async Programming**: Gestione promises e async/await  
✅ **DOM Manipulation**: Creazione dinamica di elementi HTML  
✅ **Event Handling**: Listener multipli e delegation  
✅ **Responsive Design**: Mobile-first approach con media queries  
✅ **UI/UX Design**: Interfaccia intuitiva e animazioni fluide  
✅ **Performance**: Paginazione e lazy loading  
✅ **Code Organization**: Codice pulito e ben commentato  

## 🎨 Features Tecniche

### Paginazione Efficiente
```javascript
const startIndex = (currentPage - 1) * pokemonPerPage;
const pokemonToDisplay = filteredPokemon.slice(startIndex, endIndex);
```

### Type-Based Styling
```css
.type-fire { background: #F08030; }
.type-water { background: #6890F0; }
/* 18 tipi con colori ufficiali */
```

### Loading State
```javascript
function showLoading(show) {
    loading.classList.toggle('active', show);
}
```

## 🚧 Possibili Miglioramenti Futuri

- [ ] Aggiungere tutte le generazioni (fino alla 9)
- [ ] Sistema di "Preferiti" con LocalStorage
- [ ] Confronto side-by-side di 2 Pokémon
- [ ] Catena evolutiva visualizzata
- [ ] Animazioni sprite (front/back/shiny)
- [ ] Quiz "Indovina il Pokémon"
- [ ] PWA (Progressive Web App) per uso offline
- [ ] Dark mode toggle

## 📁 Struttura del Progetto

```
pokedex/
├── index.html          # Struttura HTML principale
├── style.css           # Tutti gli stili e animazioni
├── script.js           # Logica JavaScript e API calls
└── README.md          # Questa documentazione
```

## 🌐 API Reference

Questo progetto utilizza la [PokeAPI](https://pokeapi.co/):
- `GET /pokemon/{id}` - Dettagli Pokémon
- `GET /pokemon-species/{id}` - Descrizione e info specie

## 💡 Cosa Ho Imparato

- Come gestire chiamate API asincrone multiple in parallelo
- Implementazione di filtri multipli su dati dinamici
- Creazione di UI modali accessibili
- Ottimizzazione performance con paginazione
- Gestione dello stato dell'applicazione senza framework
- Design responsive con CSS Grid e Flexbox

## 📝 Note per il CV

**Descrizione Breve**:  
*"Pokédex web app con ricerca, filtri e dettagli completi. Integrazione PokeAPI con fetch(), paginazione dinamica e design responsive. Vanilla JavaScript, CSS3 animations."*

**Highlights**:
- Integrazione REST API con gestione asincrona
- UI/UX design con animazioni CSS
- 386+ Pokémon caricati dinamicamente
- Sistema di filtri e ricerca real-time

## 👨‍💻 Autore

**Il Tuo Nome**
- Portfolio: [tuosito.com](https://tuosito.com)
- GitHub: [@tuousername](https://github.com/tuousername)
- LinkedIn: [tuo-profilo](https://linkedin.com/in/tuo-profilo)

## 📄 Licenza

Questo progetto è open source e disponibile sotto la licenza MIT.

## 🙏 Riconoscimenti

- [PokeAPI](https://pokeapi.co/) per i dati Pokémon
- The Pokémon Company per le immagini ufficiali
- Comunità open source per l'ispirazione

---

⭐ Se ti piace questo progetto, lascia una stella su GitHub!

**Pokémon** e i nomi dei Pokémon sono marchi registrati di Nintendo/Game Freak/Creatures Inc.  
Questo progetto è solo a scopo educativo e non è affiliato con The Pokémon Company.
