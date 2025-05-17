import Reloj from './reloj.js';

class Navegacion {

    paginas = [];
    reloj = null;

    constructor() {
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