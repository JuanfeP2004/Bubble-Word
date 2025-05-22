import Reloj from './reloj.js';
import Game from '../classes/game';
// import { startWordRain, stopWordRain } from '../background.js'; // No longer needed as functions are global

class Navegacion {

    paginas = [];
    reloj = null;
    game = null;

    constructor(game) {
        this.game = game;
        // Map view IDs to their containers
        this.paginas = [
            { nombre: "screen-inicio", ref: document.getElementById('main-screen') },
            { nombre: "screen-juego", ref: document.getElementById('game-screen') },
            { nombre: "screen-opciones", ref: document.getElementById('options-screen') },
            { nombre: "screen-puntuacion", ref: document.getElementById('score-screen') }
        ];

        // Initialize the hourglass timer
        this.reloj = new Reloj('time-number', 'hourglass', 30);
        
        // Connect the timer with the game
        this.game.setReloj(this.reloj);

        // Attach listeners to navigation buttons by ID
        const startButton = document.getElementById('startButton');
        const optionsButton = document.getElementById('optionsButton');
        const scoreButton = document.getElementById('scoreButton');

        if (startButton) startButton.addEventListener('click', () => this.cambiarPagina('screen-juego'));
        if (optionsButton) optionsButton.addEventListener('click', () => this.cambiarPagina('screen-opciones'));
        if (scoreButton) scoreButton.addEventListener('click', () => this.cambiarPagina('screen-puntuacion'));

    }

    paginaInicial() {
        // console.log('Navegacion: paginaInicial called'); // Removed log
        this.paginas.forEach(pagina => {
            if (pagina.nombre === 'screen-inicio') {
                pagina.ref.style.display = 'block';
                // Use global function
                if (window.startWordRain) {
                    // console.log('Navegacion: Calling startWordRain from paginaInicial'); // Removed log
                    window.startWordRain(); 
                }
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }

    // Navigate to a different page/screen
    cambiarPagina(parametro, evento = null) {
        // console.log('Navegacion: cambiarPagina called with parameter:', parametro); // Removed log
        if (evento) evento.preventDefault();

        let paginaActual = this.paginas.find(pagina => pagina.ref.style.display === 'block');

        // Stop word rain if leaving main screen
        if (paginaActual && paginaActual.nombre === 'screen-inicio') {
            // Use global function
            if (window.stopWordRain) {
                // console.log('Navegacion: Calling stopWordRain from cambiarPagina'); // Removed log
                window.stopWordRain();
            }
        }

        this.paginas.forEach(pagina => {
            if (pagina.nombre === parametro) {
                pagina.ref.style.display = 'block';

                // Start word rain if entering main screen
                if (pagina.nombre === 'screen-inicio') {
                     // Use global function
                    if (window.startWordRain) {
                        // console.log('Navegacion: Calling startWordRain from cambiarPagina'); // Removed log
                        window.startWordRain();
                    }
                }

                if (pagina.nombre === 'screen-juego') {
                    this.reloj.start();
                    this.game.GetWordObject(); // Get new word and generates bubble soup inside

                    // Generate underlines for the word (This logic can stay here or be moved to Game if desired)
                    const objectiveWordsContainer = document.querySelector('.objective-words');
                    if (objectiveWordsContainer) { // Added check for container
                         objectiveWordsContainer.innerHTML = ''; // Clear previous underlines
                        for (let i = 0; i < this.game.actual_word.length; i++) {
                            const underline = document.createElement('span');
                            underline.classList.add('word-underline');
                            objectiveWordsContainer.appendChild(underline);
                        }
                    }

                    // Removed bubble soup generation logic - now handled by game.generateBubbleSoup()
                    /*
                    const bubbleSoupContainer = document.querySelector('.bubble-soup');
                    bubbleSoupContainer.innerHTML = ''; // Clear previous bubbles

                    const wordLetters = this.game.actual_word.split('');
                    const totalBubbles = this.game.soup_lenght * this.game.soup_lenght;
                    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                    let bubbleLetters = [...wordLetters];

                    // Add random letters to fill the total number of bubbles
                    while (bubbleLetters.length < totalBubbles) {
                        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                        bubbleLetters.push(randomLetter.toLowerCase());
                    }

                    // Shuffle the letters randomly
                    for (let i = bubbleLetters.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [bubbleLetters[i], bubbleLetters[j]] = [bubbleLetters[j], bubbleLetters[i]];
                    }

                    // Create and append bubble elements
                    bubbleLetters.forEach(letter => {
                        const bubble = document.createElement('div');
                        bubble.classList.add('bubble');
                        bubble.textContent = letter.toUpperCase();
                        
                        bubble.addEventListener('click', () => {
                            this.game.handleBubbleClick(letter);
                        });

                        bubbleSoupContainer.appendChild(bubble);
                    });
                    */

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