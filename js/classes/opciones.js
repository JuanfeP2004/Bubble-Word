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
                // Redirigir al juego después de seleccionar la dificultad
                window.navegacion.showGameScreen();
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
            { time: 30, gridSize: 4, difficulty: 'easy' },    // 4x4 para fácil
            { time: 20, gridSize: 5, difficulty: 'medium' },  // 5x5 para medio
            { time: 10, gridSize: 6, difficulty: 'hard' }     // 6x6 para difícil
        ];

        const selectedDifficulty = difficulties[index];
        this.game.setDifficulty(selectedDifficulty.time, selectedDifficulty.gridSize, selectedDifficulty.difficulty);

        // Guardar la dificultad seleccionada en localStorage
        localStorage.setItem('selectedDifficulty', JSON.stringify(selectedDifficulty));
    }

    init() {
        // Cargar la dificultad guardada o usar la predeterminada (Normal)
        const savedDifficulty = localStorage.getItem('selectedDifficulty');
        if (savedDifficulty) {
            const difficulty = JSON.parse(savedDifficulty);
            const index = difficulty.gridSize === 4 ? 0 : difficulty.gridSize === 5 ? 1 : 2;
            this.selectDifficulty(index);
        } else {
            this.selectDifficulty(1); // Normal por defecto
        }
    }
}

window.OpcionesScreen = OpcionesScreen; 