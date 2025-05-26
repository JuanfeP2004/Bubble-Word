class OpcionesScreen {
    constructor(game) {
        this.game = game;
        this.dificultySelectors = document.querySelectorAll('.dificulty-selector');
        this.backButton = document.querySelector('#options-screen .navButton[data-page="screen-inicio"]');
        
        this.setupEventListeners();
        this.loadSelectedDifficulty();
    }

    setupEventListeners() {
        this.dificultySelectors.forEach(selector => {
            selector.addEventListener('click', () => this.selectDifficulty(selector));
        });
    }

    selectDifficulty(selectedSelector) {
        this.dificultySelectors.forEach(selector => {
            selector.classList.remove('selected');
        });

        selectedSelector.classList.add('selected');
        const difficulty = selectedSelector.querySelector('.dificulty-title').textContent.toLowerCase();
        localStorage.setItem('gameDifficulty', difficulty);

        if (this.game) {
            this.game.changeDifficulty(selector);
        }
    }

    loadSelectedDifficulty() {
        const savedDifficulty = localStorage.getItem('gameDifficulty') || 'facil';

        this.dificultySelectors.forEach(selector => {
            const difficultyText = selector.querySelector('.dificulty-title').textContent.toLowerCase();
            if (difficultyText === savedDifficulty) {
                selector.classList.add('selected');
                if (this.game) {
                    this.game.difficulty = savedDifficulty;
                }
            }
        });
    }
}

window.OpcionesScreen = OpcionesScreen;