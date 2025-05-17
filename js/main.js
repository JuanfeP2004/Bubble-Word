//import Navegacion from './utils/navegation.js';
//let navegation = new Navegacion()

import Game from "./classes/game";
import OpcionesScreen from "./utils/opciones";

let game = new Game();

document.addEventListener('DOMContentLoaded', () => {

    const vista = document.body.dataset.vista;

    if(vista === 'opciones') {
        let opciones_screen = new OpcionesScreen(game);
    }
    //navegation.paginaInicial();
});