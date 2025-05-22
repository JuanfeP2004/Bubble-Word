class Navegacion {
    constructor(game) {
// ... existing code ...
    }

    setupEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => this.showPage('game-screen'));
        document.getElementById('optionsButton').addEventListener('click', () => this.showPage('options-screen'));
        document.getElementById('scoreButton').addEventListener('click', () => this.showPage('score-screen'));
        
        document.querySelectorAll('.navButton').forEach(button => {
// ... existing code ...
        });
    }
} 