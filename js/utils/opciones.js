class OpcionesScreen {
    constructor() {
        this.dificultadSelect = document.getElementById('dificultad');
        this.tiempoSelect = document.getElementById('tiempo');
        this.saveButton = document.getElementById('saveOptions');
        this.cancelButton = document.getElementById('cancelOptions');
        
        this.setupEventListeners();
        this.loadOptions();
    }

    setupEventListeners() {
        this.saveButton.addEventListener('click', () => this.saveOptions());
        this.cancelButton.addEventListener('click', () => this.cancel());
    }

    loadOptions() {
        const savedOptions = localStorage.getItem('gameOptions');
        if (savedOptions) {
            const options = JSON.parse(savedOptions);
            this.dificultadSelect.value = options.dificultad;
            this.tiempoSelect.value = options.tiempo;
        }
    }

    saveOptions() {
        const options = {
            dificultad: this.dificultadSelect.value,
            tiempo: parseInt(this.tiempoSelect.value)
        };
        
        localStorage.setItem('gameOptions', JSON.stringify(options));
        
        if (window.game) {
            window.game.cambiarDificultad(options.dificultad);
        }
        
        if (window.navegacion) {
            window.navegacion.cambiarPagina('main');
        }
    }

    cancel() {
        if (window.navegacion) {
            window.navegacion.cambiarPagina('main');
        }
    }
}

window.Opciones = Opciones;