const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let drops = [];
let animationId = null;
const MAX_DROPS = 35;
const MIN_SPEED = 0.8;
const MAX_SPEED = 1.5;
const SPAWN_INTERVAL = 200;
let lastSpawnTime = 0;

// Configuración de estilos
const FONT_SIZES = [18, 20, 22];
const FONT_FAMILY = 'Arial, sans-serif';

function getRandomColor() {
    // Generar colores RGB aleatorios más vibrantes
    const r = Math.floor(Math.random() * 200) + 55; // 55-255
    const g = Math.floor(Math.random() * 200) + 55; // 55-255
    const b = Math.floor(Math.random() * 200) + 55; // 55-255
    return `rgb(${r}, ${g}, ${b})`;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createDrop() {
    const fontSize = FONT_SIZES[Math.floor(Math.random() * FONT_SIZES.length)];
    return {
        x: Math.random() * canvas.width,
        y: -30,
        text: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
        color: getRandomColor(),
        opacity: 0.8 + Math.random() * 0.2,
        fontSize: fontSize
    };
}

function initDrops() {
    drops = [];
    for (let i = 0; i < 12; i++) {
        drops.push(createDrop());
    }
}

function animate(currentTime) {
    const mainScreen = document.getElementById('main-screen');
    if (!mainScreen || mainScreen.style.display === 'none') {
        stopAnimation();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (currentTime - lastSpawnTime > SPAWN_INTERVAL && drops.length < MAX_DROPS) {
        drops.push(createDrop());
        lastSpawnTime = currentTime;
    }
    
    drops.forEach((drop, index) => {
        ctx.fillStyle = drop.color;
        ctx.globalAlpha = drop.opacity;
        ctx.font = `${drop.fontSize}px ${FONT_FAMILY}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(drop.text, drop.x, drop.y);
        
        drop.y += drop.speed;
        
        if (drop.y > canvas.height + 30) {
            drops.splice(index, 1);
        }
    });
    
    animationId = requestAnimationFrame(animate);
}

function startAnimation() {
    if (!animationId) {
        resizeCanvas();
        initDrops();
        lastSpawnTime = performance.now();
        animate(lastSpawnTime);
    }
}

function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
            const mainScreen = document.getElementById('main-screen');
            if (mainScreen && mainScreen.style.display === 'block') {
                startAnimation();
            } else {
                stopAnimation();
            }
        }
    });
});

document.querySelectorAll('#main-screen, #game-screen, #options-screen, #score-screen').forEach(screen => {
    observer.observe(screen, { attributes: true });
});

window.addEventListener('resize', () => {
    resizeCanvas();
    if (document.getElementById('main-screen').style.display === 'block') {
        initDrops();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('main-screen').style.display === 'block') {
        startAnimation();
    }
});