class Navegacion {
    constructor(game) {
        this.game = game;
        this.paginas = [
            { nombre: "screen-inicio", ref: document.getElementById('main-screen') },
            { nombre: "screen-juego", ref: document.getElementById('game-screen') },
            { nombre: "screen-opciones", ref: document.getElementById('options-screen') },
            { nombre: "screen-puntuacion", ref: document.getElementById('score-screen') }
        ];

        this.reloj = new Reloj('time-number', 'hourglass', 30);
        this.game.setReloj(this.reloj);

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => this.showPage('screen-juego'));
        document.getElementById('optionsButton').addEventListener('click', () => this.showPage('screen-opciones'));
        document.getElementById('scoreButton').addEventListener('click', () => this.showPage('screen-puntuacion'));
        
        document.querySelectorAll('.navButton').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = button.getAttribute('data-page');
                this.showPage(targetPage);
            });
        });
    }

    showPage(pageId) {
        const pages = ['screen-inicio', 'screen-juego', 'screen-opciones', 'screen-puntuacion'];
        pages.forEach(page => {
            const element = document.getElementById(page);
            if (element) {
                element.style.display = page === pageId ? 'block' : 'none';
            }
        });

        if (pageId === 'screen-juego') {
            this.game.startGame();
        }
    }

    paginaInicial() {
        this.showPage('screen-inicio');
    }
}

window.Navegacion = Navegacion;