class Navegacion {

    paginas = [];

    constructor() {
        this.paginas.push({ nombre: "screen-inicio", ref: document.getElementById('screen-inicio')});
        this.paginas.push({ nombre: "screen-juego", ref: document.getElementById('screen-juego')});
        this.paginas.push({ nombre: "screen-fin", ref: document.getElementById('screen-fin')});
        this.paginas.push({ nombre: "screen-opciones", ref: document.getElementById('screen-opciones')});
        this.paginas.push({ nombre: "screen-puntuacion", ref: document.getElementById('screen-puntuacion')});

        document.querySelectorAll('.navButton').forEach(item => {
            item.addEventListener('click', this.cambiarPagina.bind(this));
        });
    }

    paginaInicial(){
        this.paginas.find(pagina => {
            if(pagina.nombre === 'screen-inicio'){
                pagina.ref.style.display = 'block';
            }
            else {
                pagina.ref.style.display = 'none';	
            }
        });
    }

    cambiarPagina(evento) {
        let parametro = evento.target.getAttribute('data-page');
        evento.preventDefault();
    
        this.paginas.forEach(pagina => {
            if(pagina.nombre === parametro){
                pagina.ref.style.display = 'block';
            } else {
                pagina.ref.style.display = 'none';
            }
        });
    }
}

export default Navegacion;