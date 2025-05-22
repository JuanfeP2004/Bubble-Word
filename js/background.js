// Esperar a que el DOM esté completamente cargado antes de inicializar
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) {
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const letters = 'BUBBLEWORDGAMEPLAYFUN'; 
    const fontSize = 24; 
    let animationInterval = null;

    function getRandomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD433', '#33FFF5'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    let drops = [];

    function initializeDrops() {
        drops = Array.from({ length: Math.floor(canvas.width / fontSize) }, () => ({
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 1,
            letter: letters[Math.floor(Math.random() * letters.length)],
            color: getRandomColor(),
        }));
    }

    initializeDrops();

    function draw() {
        if (!ctx) return;

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
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
        initializeDrops();
        if (animationInterval) {
            stopWordRain();
            startWordRain();
        }
    });

    // The word rain animation will be started by the navigation script
});