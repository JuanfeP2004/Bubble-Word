class Navegacion {

    paginas = [];

    constructor() {
        // Mapear los IDs de las vistas con sus contenedores
        this.paginas = [
            { nombre: "screen-inicio", ref: document.getElementById('main-screen') },
            { nombre: "screen-juego", ref: document.getElementById('game-screen') },
            { nombre: "screen-opciones", ref: document.getElementById('options-screen') },
            { nombre: "screen-puntuacion", ref: document.getElementById('score-screen') }
        ];

        // Agregar event listeners a los botones de navegación
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

        this.paginas.forEach(pagina => {
            if (pagina.nombre === parametro) {
                pagina.ref.style.display = 'block';
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }
}

export default Navegacion;