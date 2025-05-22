class Navegacion {
    constructor(game) {
        this.game = game;
        this.mainScreen = document.getElementById('main-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.optionsScreen = document.getElementById('options-screen');
        this.scoreScreen = document.getElementById('score-screen');
        
        this.setupNavigation();
    }

    setupNavigation() {
        // Botón Jugar
        const startButton = document.getElementById('startButton');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.hideAllScreens();
                this.gameScreen.style.display = 'block';
                this.game.startGame();
            });
        }

        // Botón Opciones
        const optionsButton = document.getElementById('optionsButton');
        if (optionsButton) {
            optionsButton.addEventListener('click', () => {
                this.hideAllScreens();
                this.optionsScreen.style.display = 'block';
            });
        }

        // Botón Puntuaciones
        const scoreButton = document.getElementById('scoreButton');
        if (scoreButton) {
            scoreButton.addEventListener('click', () => {
                this.hideAllScreens();
                this.scoreScreen.style.display = 'block';
            });
        }

        // Botones de Regresar
        const backButtons = document.querySelectorAll('.navButton');
        backButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideAllScreens();
                this.mainScreen.style.display = 'block';
            });
        });
    }

    hideAllScreens() {
        this.mainScreen.style.display = 'none';
        this.gameScreen.style.display = 'none';
        this.optionsScreen.style.display = 'none';
        this.scoreScreen.style.display = 'none';
    }

    showMainScreen() {
        this.hideAllScreens();
        this.mainScreen.style.display = 'block';
    }
}

window.Navegacion = Navegacion;