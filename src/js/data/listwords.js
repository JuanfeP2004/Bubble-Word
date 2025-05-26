// This object contains words categorized by difficulty, matching image filenames.
// Words are in uppercase for consistency with game logic.
const words = {
    easy: [
        'CASA', 'FRESA', 'LIBRO', 'LUNA', 'PLAYA',
        'ROSA', 'SILLA', 'CAJA', 'AUTO', 'AVION', 'ARBOL'
    ],
    medium: [
        'SOMBRERO', 'TENEDOR', 'TORMENTA', 'PARAGUAS', 'PLANETA',
        'OCEANO', 'MUELLE', 'ESPEJO', 'MONTAÑA', 'AGUACATE', 'ESFERA'
    ],
    hard: [
        'MARIONETA', 'INVERNADERO', ' LABORATORIO', 'FOTOGRAFIA', 'EXPLOSION',
        'ESCRITORIO', 'ESQUELETO', 'CAMUFLAJE', 'BIBLIOTECA', 'AEROPUERTO', 'AMANECER'
    ]
};

window.words = words; // Hacer la variable words globalmente accesible