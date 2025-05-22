class Reloj {
    constructor(timeElementId, canvasElementId, initialTimeInSeconds) {
        this.timeElement = document.getElementById(timeElementId);
        this.canvas = document.getElementById(canvasElementId);
        // Check if canvas and context are available
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;
        } else {
            console.error('Reloj: Canvas element not found with ID:', canvasElementId);
            this.ctx = null; // Ensure ctx is null if canvas not found
        }
        
        this.initialTime = initialTimeInSeconds;
        this.timeLeft = initialTimeInSeconds;
        this.timerInterval = null;
        this.isRunning = false;

    }

    start() {
        if (this.isRunning || !this.ctx) return; // Prevent starting if already running or context is invalid

        this.isRunning = true;
        this.timeLeft = this.initialTime;
        this.updateDisplay();
        this.drawHourglass();

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            // Update animation every second only if context is valid
            if (this.ctx) this.drawHourglass(); 

            if (this.timeLeft <= 0) {
                this.stop();
                // Add game end logic here if needed
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
        // Redraw hourglass on reset only if context is valid
        if (this.ctx) this.drawHourglass();
    }

    updateDisplay() {
        if (this.timeElement) { // Check if timeElement exists
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}s`;
            this.timeElement.textContent = formattedTime;
        }
    }

    drawHourglass() {
        // Only draw if context is valid
        if (!this.ctx) return;

        const ctx = this.ctx;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        const sandColor = '#C2B280'; 
        const emptyColor = '#DDD'; 
        const frameColor = '#000'; 

        ctx.clearRect(0, 0, w, h);

        // Draw the hourglass frame
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

        // Calculate the percentage of time left
        const percentLeft = this.timeLeft / this.initialTime;

        // Draw sand - upper part
        ctx.beginPath();
        ctx.moveTo(w * 0.1, 0);
        ctx.lineTo(w * 0.9, 0);
        // The bottom line of the upper sand moves up according to the remaining time
        const upperSandHeight = h * 0.5 * percentLeft;
        ctx.lineTo(w * (0.5 + (0.4 * (1 - percentLeft))), h * 0.45 - (h * 0.45 * (1 - percentLeft)));
         ctx.lineTo(w * (0.5 - (0.4 * (1 - percentLeft))), h * 0.45 - (h * 0.45 * (1 - percentLeft)));
        ctx.lineTo(w * 0.1, 0);
        ctx.fillStyle = sandColor;
        ctx.fill();

         // Bottom part
        ctx.beginPath();
        ctx.moveTo(w * 0.1, h);
        ctx.lineTo(w * 0.9, h);
         // Sand falling effect
        const lowerSandHeight = h * 0.5 * (1 - percentLeft);
        ctx.lineTo(w * (0.5 + (0.4 * percentLeft)), h * 0.55 + (h * 0.45 * percentLeft));
        ctx.lineTo(w * (0.5 - (0.4 * percentLeft)), h * 0.55 + (h * 0.45 * percentLeft));
        ctx.lineTo(w * 0.1, h);
        ctx.fillStyle = sandColor;
        ctx.fill();
    }
}

export default Reloj; 