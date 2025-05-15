const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const letters = 'BUBBLEWORDGAMEPLAYFUN'; 
const fontSize = 24; 
const columns = Math.floor(canvas.width / fontSize); 


function getRandomColor() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD433', '#33FFF5'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const drops = Array.from({ length: columns }, () => ({
  y: Math.random() * canvas.height, 
  speed: Math.random() * 3 + 1, 
  letter: letters[Math.floor(Math.random() * letters.length)], 
  color: getRandomColor(), 
}));

function draw() {
  ctx.fillStyle = '#71C2DF'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

 
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


setInterval(draw, 50);


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  
  drops.length = Math.floor(canvas.width / fontSize);
  for (let i = 0; i < drops.length; i++) {
    drops[i] = {
      y: Math.random() * canvas.height,
      speed: Math.random() * 3 + 1,
      letter: letters[Math.floor(Math.random() * letters.length)], 
      color: getRandomColor(),
    };
  }
});