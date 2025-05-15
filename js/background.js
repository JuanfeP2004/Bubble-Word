const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
const columns = canvas.width / fontSize; // Número de columnas de letras
const drops = Array(Math.floor(columns)).fill(1); // Posición inicial de cada columna

function draw() {
  // Fondo semitransparente para crear efecto de "desvanecimiento"
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Estilo de las letras
  ctx.fillStyle = '#0F0'; // Verde Matrix
  ctx.font = `${fontSize}px monospace`;

  // Dibujar cada letra
  drops.forEach((y, x) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, x * fontSize, y * fontSize);

    // Reiniciar la posición de la letra si sale de la pantalla
    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[x] = 0;
    }

    // Mover la letra hacia abajo
    drops[x]++;
  });
}

// Ejecutar la animación
setInterval(draw, 50);

// Ajustar el tamaño del canvas si cambia el tamaño de la ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});