class Reloj {
    constructor(timeElementId, canvasElementId, initialTimeInSeconds) {
        this.timeElement = document.getElementById(timeElementId);
        this.canvas = document.getElementById(canvasElementId);
        this.ctx = this.canvas.getContext('2d');
        this.initialTime = initialTimeInSeconds;
        this.timeLeft = initialTimeInSeconds;
        this.timerInterval = null;
        this.isRunning = false;

        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.timeLeft = this.initialTime;
        this.updateDisplay();
        this.drawHourglass();

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            this.drawHourglass(); // Update animation every second

            if (this.timeLeft <= 0) {
                this.stop();
                // Aquí podrías añadir lógica para fin de juego, etc.
                console.log("¡Tiempo terminado!");
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
    }

    reset() {
        this.stop();
        this.timeLeft = this.initialTime;
        this.updateDisplay();
        this.drawHourglass();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}s`;
        this.timeElement.textContent = formattedTime;
    }

    drawHourglass() {
        const ctx = this.ctx;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        const sandColor = '#C2B280'; 
        const emptyColor = '#DDD'; 
        const frameColor = '#000'; 

        ctx.clearRect(0, 0, w, h);

        // Dibujar el marco del reloj de arena
        ctx.beginPath();
        ctx.moveTo(w * 0.1, 0);
        ctx.lineTo(w * 0.9, 0);
        ctx.lineTo(w * 0.55, h * 0.45);
        ctx.lineTo(w * 0.45, h * 0.45);
        ctx.lineTo(w * 0.1, 0);

        ctx.moveTo(w * 0.1, h);
        ctx.lineTo(w * 0.9, h);
        ctx.lineTo(w * 0.55, h * 0.55);
        ctx.lineTo(w * 0.45, h * 0.55);
        ctx.lineTo(w * 0.1, h);
        ctx.strokeStyle = frameColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calcular el porcentaje de tiempo restante
        const percentLeft = this.timeLeft / this.initialTime;

        // Dibujar arena
        ctx.beginPath();
        ctx.moveTo(w * 0.1, 0);
        ctx.lineTo(w * 0.9, 0);
        // La línea inferior de la arena superior se mueve hacia arriba según el tiempo restante
        const upperSandHeight = h * 0.5 * percentLeft;
        ctx.lineTo(w * (0.5 + (0.4 * (1 - percentLeft))), h * 0.45 - (h * 0.45 * (1 - percentLeft)));
         ctx.lineTo(w * (0.5 - (0.4 * (1 - percentLeft))), h * 0.45 - (h * 0.45 * (1 - percentLeft)));
        ctx.lineTo(w * 0.1, 0);
        ctx.fillStyle = sandColor;
        ctx.fill();

         // Parte inferior
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h);
        ctx.lineTo(w * 0.9, h);
         // efecto de la arena que cae
        const lowerSandHeight = h * 0.5 * (1 - percentLeft);
        ctx.lineTo(w * (0.5 + (0.4 * percentLeft)), h * 0.55 + (h * 0.45 * percentLeft));
        ctx.lineTo(w * (0.5 - (0.4 * percentLeft)), h * 0.55 + (h * 0.45 * percentLeft));
        ctx.lineTo(w * 0.1, h);
        ctx.fillStyle = sandColor;
        ctx.fill();
    }
}

export default Reloj; 