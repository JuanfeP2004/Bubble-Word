import Game from './classes/game.js';
import Navegacion from './utils/navegation.js';

import "./data/listwords.js"
//import "./utils/reloj.js"
import OpcionesScreen from "./classes/opciones.js"
import PuntuacionesScreen from "./classes/puntuaciones.js"
import "./background.js"

document.addEventListener('DOMContentLoaded', function() {
    // Crear instancia del juego
    window.game = new Game();
    
    // Mostrar pantalla principal después del splash
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        
        // Inicializar navegación
        window.navegacion = new Navegacion(window.game);
        //window.navegacion.paginaInicial();
    }, 2000);
});

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar pantalla principal después del splash
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        
        // Crear instancia del juego e inicializar navegación
        //window.game = new Game();
        //window.navegacion = new Navegacion(window.game);

        // Crear instancias de las pantallas
        window.opcionesScreen = new OpcionesScreen(window.game);
        window.puntuacionesScreen = new PuntuacionesScreen(window.game);

        // Inicializar las pantallas
        window.opcionesScreen.init();
        window.puntuacionesScreen.init();

        // Mostrar la pantalla inicial
        //window.navegacion.paginaInicial();
    }, 2000);


    // Lógica para la pantalla de fin de partida
    const endgameForm = document.getElementById('endgame-form');
    const retryButton = document.getElementById('retry-button');
    const exitButton = document.getElementById('exit-button');
    const sendButton = document.getElementById('send-button');

    if (endgameForm) {
        endgameForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('player-name').value.trim();
            const score = parseInt(document.getElementById('final-score').textContent, 10);
            if (name && !isNaN(score)) {
                // Guardar en localStorage (usando el formato de puntuaciones.js)
                let scores = JSON.parse(localStorage.getItem('gameScores')) || [];
                scores.push({
                    name: name,
                    score: score,
                    gridSize: window.game.gridSize,
                    date: new Date().toISOString()
                });
                localStorage.setItem('gameScores', JSON.stringify(scores));
                // Solo actualizar la tabla de puntuaciones si existe
                if (window.puntuacionesScreen && typeof window.puntuacionesScreen.loadScores === 'function') {
                    window.puntuacionesScreen.loadScores();
                }
                // No cambiar de pantalla
            }
        });
    }
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            // Limpiar el campo de nombre
            document.getElementById('player-name').value = '';
            // Limpiar el puntaje final
            document.getElementById('final-score').textContent = '0';
            // Ocultar pantalla de fin de juego
            document.getElementById('endgame-screen').style.display = 'none';
            // Mostrar pantalla de juego
            document.getElementById('game-screen').style.display = 'block';
            // Reiniciar el juego
            window.game.startGame();
        });
    }
    if (exitButton) {
        exitButton.addEventListener('click', function() {
            document.getElementById('endgame-screen').style.display = 'none';
            document.getElementById('main-screen').style.display = 'block';
        });
        
    }
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            document.getElementById('endgame-screen').style.display = 'none';
            document.getElementById('main-screen').style.display = 'block';
        });
        
    }

    // Botón para volver al menú principal desde el juego
    const backToMenuBtn = document.getElementById('back-to-menu');
    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', function() {
            // Detener el juego completamente
            if (window.game && typeof window.game.endGame === 'function') {
                window.game.endGame(); // Debe limpiar timers y lógica de juego
            }
            // Ocultar pantallas de juego y fin de partida
            document.getElementById('game-screen').style.display = 'none';
            document.getElementById('endgame-screen').style.display = 'none';
            document.getElementById('main-screen').style.display = 'block';
        });
    }

    // Instrucciones modal
    const instructionsBtn = document.getElementById('instructionsButton');
    const instructionsModal = document.getElementById('instructions-modal');
    const closeInstructions = document.getElementById('closeInstructions');

    if (instructionsBtn && instructionsModal && closeInstructions) {
        instructionsBtn.addEventListener('click', function() {
            instructionsModal.style.display = 'block';
        });
        closeInstructions.addEventListener('click', function() {
            instructionsModal.style.display = 'none';
        });
        window.addEventListener('click', function(event) {
            if (event.target === instructionsModal) {
                instructionsModal.style.display = 'none';
            }
        });
    }

    // Botón de Pista
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        hintButton.addEventListener('click', function() {
            if (window.game && typeof window.game.useHint === 'function') {
                window.game.useHint();
            }
        });
    }

    // Audio de fondo
    const mainThemeAudio = document.getElementById('main-theme-audio');
    if (mainThemeAudio) {
        // Detener cuando termina el juego o vuelve al menú
        const stopGame = () => {
            mainThemeAudio.pause();
            mainThemeAudio.currentTime = 0;
        };

        // Detener audio al volver al menú principal
        const backToMenuBtn = document.getElementById('back-to-menu');
        if (backToMenuBtn) {
            backToMenuBtn.addEventListener('click', stopGame);
        }
        const exitButton = document.getElementById('exit-button');
        if (exitButton) {
            exitButton.addEventListener('click', stopGame);
        }
        const sendButton = document.getElementById('send-button');
        if (sendButton) {
            sendButton.addEventListener('click', stopGame);
        }

        // Pausar audio al mostrar el Easter Egg y reanudar al cerrarlo
        const mainLogo = document.querySelector('#main-screen .main-logo');
        const easterEggModal = document.getElementById('easter-egg-modal');
        let easterEggAudio = null;

        if (mainLogo && easterEggModal) {
            mainLogo.addEventListener('click', function() {
                easterEggModal.style.display = 'flex';
                // Pausar el tema principal
                mainThemeAudio.pause();
                // Reproducir sonido del Easter Egg
                easterEggAudio = new Audio('sonido/Halo.mp3');
                easterEggAudio.play();
            });
            easterEggModal.addEventListener('click', function() {
                easterEggModal.style.display = 'none';
                // Detener sonido del Easter Egg
                if (easterEggAudio) {
                    easterEggAudio.pause();
                    easterEggAudio.currentTime = 0;
                    easterEggAudio = null;
                }
                // Reanudar el tema principal si el juego está activo
                if (document.getElementById('game-screen').style.display === 'block') {
                    mainThemeAudio.play();
                }
            });
        }
    }
});