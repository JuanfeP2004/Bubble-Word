//import Navegacion from './utils/navegation.js';
//let navegacion = new Navegacion()

import Game from "./classes/game";
import OpcionesScreen from "./utils/opciones";
import Navegacion from "./utils/navegation.js"; // Import Navegacion

export let game = new Game(); // Export the game object
// let navegacion = new Navegacion(game); // This instance might not be necessary if index.html handles initialization

document.addEventListener('DOMContentLoaded', () => {

    const vista = document.body.dataset.vista;

    if(vista === 'opciones') {
        let opciones_screen = new OpcionesScreen(game);
    }
    // The image loading logic is now in Navegacion.js
    // navegacion.paginaInicial(); // This call might not be needed if the script at the end of index.html handles initial page display
});

// The script at the end of index.html seems to initialize Navegacion, 
// we might need to modify that part or ensure this Navegacion instance is used.