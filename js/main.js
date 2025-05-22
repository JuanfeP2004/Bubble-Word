import Game from './classes/game.js';
import Navegacion from './utils/navegation.js';

document.addEventListener('DOMContentLoaded', function() {
    // Crear instancia del juego
    window.game = new Game();
    
    // Mostrar pantalla principal después del splash
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        
        // Inicializar navegación
        window.navegacion = new Navegacion(window.game);
        window.navegacion.paginaInicial();
    }, 2000);
});