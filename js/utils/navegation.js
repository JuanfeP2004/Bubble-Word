import Reloj from './reloj.js';
import Game from '../classes/game';

class Navegacion {

    paginas = [];
    reloj = null;
    game = null;

    constructor(game) {
        this.game = game;
        // Mapear los IDs de las vistas con sus contenedores
        this.paginas = [
            { nombre: "screen-inicio", ref: document.getElementById('main-screen') },
            { nombre: "screen-juego", ref: document.getElementById('game-screen') },
            { nombre: "screen-opciones", ref: document.getElementById('options-screen') },
            { nombre: "screen-puntuacion", ref: document.getElementById('score-screen') }
        ];

        // Inicializar el reloj de arena
        this.reloj = new Reloj('time-number', 'hourglass', 30);

        //botones de navegación
        document.querySelectorAll('.navButton').forEach(item => {
            item.addEventListener('click', this.cambiarPagina.bind(this));
        });
    }

    paginaInicial() {
        this.paginas.forEach(pagina => {
            if (pagina.nombre === 'screen-inicio') {
                pagina.ref.style.display = 'block';
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }

    cambiarPagina(evento) {
        let parametro = evento.target.getAttribute('data-page');
        evento.preventDefault();

        let paginaActual = this.paginas.find(pagina => pagina.ref.style.display === 'block');

        this.paginas.forEach(pagina => {
            if (pagina.nombre === parametro) {
                pagina.ref.style.display = 'block';

                if (pagina.nombre === 'screen-juego') {
                    this.reloj.start();
                    this.game.GetWordObject();
                    const gamePhoto = document.querySelector('.game-photo');
                    if (gamePhoto) {
                        gamePhoto.src = this.game.actual_image;
                    }

                    // Generate underlines for the word
                    const objectiveWordsContainer = document.querySelector('.objective-words');
                    objectiveWordsContainer.innerHTML = ''; // Clear previous underlines
                    for (let i = 0; i < this.game.actual_word.length; i++) {
                        const underline = document.createElement('span');
                        underline.classList.add('word-underline');
                        objectiveWordsContainer.appendChild(underline);
                    }

                    // Generate bubbles for the bubble soup
                    const bubbleSoupContainer = document.querySelector('.bubble-soup');
                    bubbleSoupContainer.innerHTML = ''; // Clear previous bubbles

                    const wordLetters = this.game.actual_word.split('');
                    const totalBubbles = this.game.soup_lenght * this.game.soup_lenght; // Example: 5x5 grid for easy
                    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                    let bubbleLetters = [...wordLetters];

                    // Add random letters to fill the total number of bubbles
                    while (bubbleLetters.length < totalBubbles) {
                        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                        bubbleLetters.push(randomLetter.toLowerCase()); // Use lowercase like in wireframe
                    }

                    // Shuffle the letters randomly
                    for (let i = bubbleLetters.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [bubbleLetters[i], bubbleLetters[j]] = [bubbleLetters[j], bubbleLetters[i]]; // Swap elements
                    }

                    // Create and append bubble elements
                    bubbleLetters.forEach(letter => {
                        const bubble = document.createElement('div');
                        bubble.classList.add('bubble');
                        bubble.textContent = letter.toUpperCase(); // Display uppercase letter in bubble
                        bubbleSoupContainer.appendChild(bubble);
                    });

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