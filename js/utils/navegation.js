class Navegacion {

    paginas = [];

    constructor() {
        this.paginas.push({ nombre: "inicio", ref: document.getElementById('screen-inicio')});
        this.paginas.push({ nombre: "juego", ref: document.getElementById('screen-juego')});
        this.paginas.push({ nombre: "verHoy", ref: document.getElementById('screen-fin')});
        this.paginas.push({ nombre: "calendario", ref: document.getElementById('screen-opciones')});
        this.paginas.push({ nombre: "pomodoro", ref: document.getElementById('screen-puntuacion')});

        document.querySelectorAll('.navButton').forEach(item => {
            item.addEventListener('click', this.cambiarPagina.bind(this));
        });
    }

    paginaInicial(){
        this.paginas.find(pagina => {
            if(pagina.nombre === 'inicio'){
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