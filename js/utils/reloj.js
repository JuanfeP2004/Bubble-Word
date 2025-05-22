class Reloj {
    constructor(timeElementId, canvasElementId, initialTimeInSeconds) {
        this.timeElement = document.getElementById(timeElementId);
        this.canvas = document.getElementById(canvasElementId);
        console.log('Reloj: Looking for canvas with ID:', canvasElementId, ', found:', this.canvas);
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            console.log('Reloj: Got canvas context:', this.ctx);
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;
        } else {
            console.error('Reloj: Canvas element not found with ID:', canvasElementId);
            this.ctx = null;
        }
        
        this.initialTime = initialTimeInSeconds;
        this.timeLeft = initialTimeInSeconds;
        this.timerInterval = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning || !this.ctx) return;

        this.isRunning = true;
        this.timeLeft = this.initialTime;
        this.updateDisplay();
        this.drawHourglass();

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            if (this.ctx) this.drawHourglass(); 

            if (this.timeLeft <= 0) {
                this.stop();
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
        if (this.ctx) this.drawHourglass();
    }

    updateDisplay() {
        if (this.timeElement) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}s`;
            this.timeElement.textContent = formattedTime;
        }
    }

    drawHourglass() {
        if (!this.ctx) {
            console.log('Reloj: Cannot draw, context is null.');
            return;
        }

        console.log('Reloj: Drawing hourglass.');
        const ctx = this.ctx;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        const sandColor = '#C2B280'; 
        const emptyColor = '#DDD'; 
        const frameColor = '#000'; 

        ctx.clearRect(0, 0, w, h);

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

        const percentLeft = this.timeLeft / this.initialTime;

        ctx.beginPath();
        ctx.moveTo(w * 0.1, 0);
        ctx.lineTo(w * 0.9, 0);
        const upperSandHeight = h * 0.5 * percentLeft;
        ctx.lineTo(w * (0.5 + (0.4 * (1 - percentLeft))), h * 0.45 - (h * 0.45 * (1 - percentLeft)));
         ctx.lineTo(w * (0.5 - (0.4 * (1 - percentLeft))), h * 0.45 - (h * 0.45 * (1 - percentLeft)));
        ctx.lineTo(w * 0.1, 0);
        ctx.fillStyle = sandColor;
        ctx.fill();

         ctx.beginPath();
        ctx.moveTo(w * 0.1, h);
        ctx.lineTo(w * 0.9, h);
         const lowerSandHeight = h * 0.5 * (1 - percentLeft);
        ctx.lineTo(w * (0.5 + (0.4 * percentLeft)), h * 0.55 + (h * 0.45 * percentLeft));
        ctx.lineTo(w * (0.5 - (0.4 * percentLeft)), h * 0.55 + (h * 0.45 * percentLeft));
        ctx.lineTo(w * 0.1, h);
        ctx.fillStyle = sandColor;
        ctx.fill();
    }
}

window.Reloj = Reloj; 