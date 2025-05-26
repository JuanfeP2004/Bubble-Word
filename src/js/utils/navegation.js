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
        const startButton = document.getElementById('startButton');
        const optionsButton = document.getElementById('optionsButton');
        const scoreButton = document.getElementById('scoreButton');
        const backButtons = document.querySelectorAll('.navButton[data-page="main-screen"], .navButton[data-page="screen-inicio"]');

        if (startButton) {
            startButton.addEventListener('click', () => this.showGameScreen());
        }

        if (optionsButton) {
            optionsButton.addEventListener('click', () => this.showOptionsScreen());
        }

        if (scoreButton) {
            scoreButton.addEventListener('click', () => this.showScoreScreen());
        }

        backButtons.forEach(button => {
            button.addEventListener('click', () => this.showMainScreen());
        });
    }

    hideAllScreens() {
        this.mainScreen.style.display = 'none';
        this.gameScreen.style.display = 'none';
        this.optionsScreen.style.display = 'none';
        this.scoreScreen.style.display = 'none';
    }

    showGameScreen() {
        this.hideAllScreens();
        this.gameScreen.style.display = 'block';
        this.game.startGame();
        
        // Iniciar la música de fondo
        const mainThemeAudio = document.getElementById('main-theme-audio');
        if (mainThemeAudio) {
            mainThemeAudio.currentTime = 0;
            mainThemeAudio.volume = 0.5;
            mainThemeAudio.play();
        }
    }

    showOptionsScreen() {
        this.hideAllScreens();
        this.optionsScreen.style.display = 'block';
    }

    showScoreScreen() {
        this.hideAllScreens();
        this.scoreScreen.style.display = 'block';
    }

    showMainScreen() {
        this.hideAllScreens();
        this.mainScreen.style.display = 'block';
    }
}

//window.Navegacion = Navegacion;
export default Navegacion;