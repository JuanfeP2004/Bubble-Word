import Reloj from './reloj.js';
import Game from '../classes/game';

class Navegacion {
    paginas = [];
    reloj = null;
    game = null;

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

        const startButton = document.getElementById('startButton');
        const optionsButton = document.getElementById('optionsButton');
        const scoreButton = document.getElementById('scoreButton');

        if (startButton) startButton.addEventListener('click', () => this.cambiarPagina('screen-juego'));
        if (optionsButton) optionsButton.addEventListener('click', () => this.cambiarPagina('screen-opciones'));
        if (scoreButton) scoreButton.addEventListener('click', () => this.cambiarPagina('screen-puntuacion'));
    }

    paginaInicial() {
        this.paginas.forEach(pagina => {
            if (pagina.nombre === 'screen-inicio') {
                pagina.ref.style.display = 'block';
                if (window.startWordRain) {
                    window.startWordRain(); 
                }
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }

    cambiarPagina(parametro, evento = null) {
        if (evento) evento.preventDefault();

        let paginaActual = this.paginas.find(pagina => pagina.ref.style.display === 'block');

        if (paginaActual && paginaActual.nombre === 'screen-inicio') {
            if (window.stopWordRain) {
                window.stopWordRain();
            }
        }

        this.paginas.forEach(pagina => {
            if (pagina.nombre === parametro) {
                pagina.ref.style.display = 'block';

                if (pagina.nombre === 'screen-inicio') {
                    if (window.startWordRain) {
                        window.startWordRain();
                    }
                }

                if (pagina.nombre === 'screen-juego') {
                    this.reloj.start();
                    this.game.GetWordObject();

                    const objectiveWordsContainer = document.querySelector('.objective-words');
                    if (objectiveWordsContainer) {
                        objectiveWordsContainer.innerHTML = '';
                        for (let i = 0; i < this.game.actual_word.length; i++) {
                            const underline = document.createElement('span');
                            underline.classList.add('word-underline');
                            objectiveWordsContainer.appendChild(underline);
                        }
                    }
                }
            } else {
                pagina.ref.style.display = 'none';
            }
        });
        
        if (paginaActual && paginaActual.nombre === 'screen-juego' && parametro !== 'screen-juego') {
            this.reloj.reset();
        }
    }
}

export default Navegacion;