class OpcionesScreen {
    constructor(game) {
        this.game = game; // Instancia del juego para cambiar la dificultad
        this.dificultySelectors = document.querySelectorAll('#options-screen .dificulty-selector');
        this.backButton = document.querySelector('#options-screen .navButton[data-page="screen-inicio"]');
        
        this.setupEventListeners();
        this.loadSelectedDifficulty();
    }

    setupEventListeners() {
        // Añadir listeners a los selectores de dificultad
        this.dificultySelectors.forEach(selector => {
            selector.addEventListener('click', () => this.selectDifficulty(selector));
        });

        // El botón de regresar ya tiene su listener en Navegacion, solo nos aseguramos de que la lógica del juego/opciones sea correcta al regresar.
        // La navegación en showPage (en Navegacion) ya maneja el cambio de pantalla.
    }

    selectDifficulty(selectedSelector) {
        // Remover la clase 'selected' de todos los selectores
        this.dificultySelectors.forEach(selector => {
            selector.classList.remove('selected');
        });

        // Añadir la clase 'selected' al selector clicado
        selectedSelector.classList.add('selected');

        // Obtener la dificultad seleccionada (asumiendo que está en el texto del .dificulty-title)
        const difficulty = selectedSelector.querySelector('.dificulty-title').textContent.toLowerCase();
        
        // Guardar la dificultad seleccionada en localStorage
        localStorage.setItem('gameDifficulty', difficulty);

        // Informar al objeto game sobre el cambio de dificultad
        if (this.game) {
            // Aquí asumimos que hay un método changeDifficulty en la clase Game
            // que toma la string de dificultad (ej: 'facil', 'normal', 'dificil').
            this.game.changeDifficulty(difficulty);
        }

        console.log(`Dificultad seleccionada y guardada: ${difficulty}`);
    }

    loadSelectedDifficulty() {
        // Cargar la dificultad guardada de localStorage
        const savedDifficulty = localStorage.getItem('gameDifficulty') || 'facil'; // Default a facil

        // Encontrar el selector de dificultad correspondiente y marcarlo como seleccionado
        this.dificultySelectors.forEach(selector => {
            const difficultyText = selector.querySelector('.dificulty-title').textContent.toLowerCase();
            if (difficultyText === savedDifficulty) {
                selector.classList.add('selected');
                // Asegurar que el objeto game también se inicialice con esta dificultad
                if (this.game) {
                    this.game.difficulty = savedDifficulty;
                    // El game.changeDifficulty ya se llama al inicio o al empezar partida, 
                    // esto solo asegura que el estado inicial de la UI de opciones coincida con el game.
                }
            }
        });
        
        console.log(`Dificultad cargada: ${savedDifficulty}`);
    }

    // No necesitamos métodos saveOptions o cancel separados, la selección guarda y el botón de regresar navega.
}

// Hacer la clase OpcionesScreen globalmente accesible
window.OpcionesScreen = OpcionesScreen;