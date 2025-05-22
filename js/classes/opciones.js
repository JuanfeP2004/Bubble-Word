class OpcionesScreen {
    constructor(game) {
        this.game = game;
        this.dificultySelectors = document.querySelectorAll('.dificulty-selector');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.dificultySelectors.forEach((selector, index) => {
            selector.addEventListener('click', () => {
                this.selectDifficulty(index);
            });
        });
    }

    selectDifficulty(index) {
        // Remover la clase activa de todos los selectores
        this.dificultySelectors.forEach(selector => {
            selector.classList.remove('active');
        });

        // Agregar la clase activa al selector seleccionado
        this.dificultySelectors[index].classList.add('active');

        // Configurar la dificultad en el juego
        const difficulties = [
            { time: 30, gridSize: 5 },
            { time: 20, gridSize: 7 },
            { time: 10, gridSize: 9 }
        ];

        const selectedDifficulty = difficulties[index];
        this.game.setDifficulty(selectedDifficulty.time, selectedDifficulty.gridSize);

        // Guardar la dificultad seleccionada en localStorage
        localStorage.setItem('selectedDifficulty', JSON.stringify(selectedDifficulty));
    }

    init() {
        // Cargar la dificultad guardada o usar la predeterminada (Normal)
        const savedDifficulty = localStorage.getItem('selectedDifficulty');
        if (savedDifficulty) {
            const difficulty = JSON.parse(savedDifficulty);
            const index = difficulty.gridSize === 5 ? 0 : difficulty.gridSize === 7 ? 1 : 2;
            this.selectDifficulty(index);
        } else {
            this.selectDifficulty(1); // Normal por defecto
        }
    }
}

window.OpcionesScreen = OpcionesScreen; 