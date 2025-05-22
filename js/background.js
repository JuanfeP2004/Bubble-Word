// Esperar a que el DOM esté completamente cargado antes de inicializar
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    // Verificar si el canvas se encontró correctamente
    if (!canvas) {
        return; // Salir si no se encuentra el canvas
    }
    
    const ctx = canvas.getContext('2d');
    // Verificar si el contexto 2D se obtuvo correctamente
    if (!ctx) {
        return; // Salir si no se obtiene el contexto
    }

    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Initial resize
    resizeCanvas();

    const letters = 'BUBBLEWORDGAMEPLAYFUN'; 
    const fontSize = 24; 
    let animationInterval = null;

    function getRandomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD433', '#33FFF5'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Initialize drops array
    let drops = [];

    function initializeDrops() {
        drops = Array.from({ length: Math.floor(canvas.width / fontSize) }, () => ({
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 1,
            letter: letters[Math.floor(Math.random() * letters.length)],
            color: getRandomColor(),
        }));
    }

    // Initial drops setup
    initializeDrops();

    function draw() {
        // Verificar si el contexto es válido antes de dibujar
        if (!ctx) return;

        // Clear the canvas in each frame instead of drawing a semi-transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = `bold ${fontSize}px Arial`;

        drops.forEach((drop, x) => {
            ctx.fillStyle = drop.color;
            ctx.fillText(drop.letter, x * fontSize, drop.y);

            drop.y += drop.speed;

            if (drop.y > canvas.height) {
                drop.y = 0;
                drop.speed = Math.random() * 3 + 1;
                drop.letter = letters[Math.floor(Math.random() * letters.length)];
                drop.color = getRandomColor();
            }
        });
    }

    // Funciones exportadas globalmente para controlar la animación
    window.startWordRain = function() {
        if (!animationInterval) {
            resizeCanvas();
            initializeDrops();
            animationInterval = setInterval(draw, 50);
        }
    };

    window.stopWordRain = function() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
            // Clear the canvas when stopping animation
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initializeDrops();
        if (animationInterval) {
            stopWordRain();
            startWordRain();
        }
    });

    // The word rain animation will be started by the navigation script

}); // End of DOMContentLoaded listener