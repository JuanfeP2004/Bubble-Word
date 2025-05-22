class PuntuacionesScreen {
    constructor(game) {
        this.game = game;
        this.bestGamesContainer = document.querySelector('.bestgames-container');
        this.loadScores();
    }

    loadScores() {
        // Obtener las puntuaciones del localStorage
        const scores = JSON.parse(localStorage.getItem('gameScores')) || [];
        
        // Ordenar las puntuaciones de mayor a menor
        scores.sort((a, b) => b.score - a.score);
        
        // Limitar a las 5 mejores puntuaciones
        const topScores = scores.slice(0, 5);
        
        // Limpiar el contenedor
        this.bestGamesContainer.innerHTML = '';
        
        if (topScores.length === 0) {
            this.bestGamesContainer.innerHTML = '<p class="no-scores">No hay puntuaciones guardadas</p>';
            return;
        }

        // Crear la tabla de puntuaciones
        const table = document.createElement('table');
        table.className = 'scores-table';
        
        // Crear el encabezado
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Puntuación</th>
                <th>Dificultad</th>
            </tr>
        `;
        table.appendChild(thead);

        // Crear el cuerpo de la tabla
        const tbody = document.createElement('tbody');
        topScores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.name || 'Sin nombre'}</td>
                <td>${score.score}</td>
                <td>${this.getDifficultyName(score.gridSize)}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        this.bestGamesContainer.appendChild(table);
    }

    getDifficultyName(gridSize) {
        switch(gridSize) {
            case 5: return 'Fácil';
            case 7: return 'Normal';
            case 9: return 'Difícil';
            default: return 'Desconocida';
        }
    }

    addScore(score, gridSize) {
        // Obtener las puntuaciones existentes
        const scores = JSON.parse(localStorage.getItem('gameScores')) || [];
        
        // Agregar la nueva puntuación
        scores.push({
            score: score,
            gridSize: gridSize,
            date: new Date().toISOString()
        });
        
        // Guardar las puntuaciones actualizadas
        localStorage.setItem('gameScores', JSON.stringify(scores));
        
        // Recargar la tabla de puntuaciones
        this.loadScores();
    }

    init() {
        this.loadScores();
    }
}

window.PuntuacionesScreen = PuntuacionesScreen;