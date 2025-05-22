class Game {
    constructor() {
        this.currentWord = '';
        this.currentCategory = '';
        this.score = 0;
        this.difficulty = 'facil';
        this.gridSize = 5;
        this.timeLimit = 30;
        this.isPlaying = false;
        this.selectedLetters = [];
        this.correctWords = [];
        this.images = [
            'casa.jpg', 'fresa.jpg', 'libro.jpg', 'luna.jpg', 'playa.jpg',
            'rosa.jpg', 'silla.jpg', 'caja.jpg', 'auto.jpg', 'avion.jpg', 'arbol.jpg'
        ];
        this.wordDisplay = document.getElementById('word-display');
        this.gamePhotoElement = document.querySelector('.game-photo');
        this.feedbackMessageElement = document.getElementById('feedback-message');
        this.isActive = false; // Nueva bandera
        this.initializeGame();
        this.initClock();
    }

    initializeGame() {
        this.loadBestGames();
        const easySelectorButton = document.querySelector('.dificulty-selector .dificulty-title');
        if (easySelectorButton && easySelectorButton.textContent.toLowerCase() === 'facil') {
            const facilButton = easySelectorButton.closest('.dificulty-selector');
            if(facilButton) {
                 facilButton.classList.add('selected');
            }
        }
        this.setupReloadButton();
    }

    setupReloadButton() {
        const reloadButton = document.getElementById('reloadButton');
        if (reloadButton) {
            reloadButton.addEventListener('click', () => this.reloadGrid());
        }
    }

    reloadGrid() {
        if (this.isPlaying) {
            const grid = document.querySelector('.bubble-soup');
            grid.innerHTML = '';
            this.selectedLetters = [];
            this.updateWordDisplay();
            this.feedbackMessageElement.textContent = '';

            this.createGrid();
        }
    }

    initClock() {
        this.clock = new Reloj('time-number', 'hourglassCanvas', this.timeLimit, () => {
            this.showEndGameScreen();
        });
    }

    startGame() {
        this.isPlaying = true;
        this.isActive = true;
        this.score = 0;
        this.updateScore();
        this.loadRandomImage();
        this.selectWordFromImage();
        this.createGrid();
        this.initClock();
        this.clock.start();
    }

    endGame() {
        this.isActive = false;
        this.isPlaying = false;
        if (this.clock && typeof this.clock.stop === 'function') {
            this.clock.stop();
        }
    }

    onTimeOut() {
        // Este método se llama cuando se acaba el tiempo
        if (!this.isActive) return; // No hacer nada si el juego no está activo

        // ...mostrar pantalla de "Perdiste"...
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('endgame-screen').style.display = 'block';
        
    }

    loadRandomImage() {
        let imagesForDifficulty = [];
        switch (this.difficulty) {
            case 'facil':
                imagesForDifficulty = this.images;
                break;
            case 'normal':
                 imagesForDifficulty = this.images.filter(img => 
                     words.medium.includes(img.replace('.jpg', '').toUpperCase()));
                 if (imagesForDifficulty.length === 0 && this.images.length > 0) {
                     imagesForDifficulty = this.images;
                 }
                break;
            case 'dificil':
                 imagesForDifficulty = this.images.filter(img => 
                     words.hard.includes(img.replace('.jpg', '').toUpperCase()));
                 if (imagesForDifficulty.length === 0 && this.images.length > 0) {
                     imagesForDifficulty = this.images;
                 }
                break;
        }

        if (imagesForDifficulty.length === 0) {
            return;
        }

        const randomImage = imagesForDifficulty[Math.floor(Math.random() * imagesForDifficulty.length)];
        this.gamePhotoElement.src = `img/words/${this.difficulty === 'facil' ? 'easy' : this.difficulty}/${randomImage}`;
        this.gamePhotoElement.alt = randomImage.replace('.jpg', '').toUpperCase();
    }

    selectWordFromImage() {
        this.currentWord = this.gamePhotoElement.alt;
        this.currentWord = this.currentWord.toUpperCase();
        this.displayWordProgress();
    }

    displayWordProgress() {
        this.wordDisplay.innerHTML = '';
        for (let i = 0; i < this.currentWord.length; i++) {
            const letterContainer = document.createElement('div');
            letterContainer.className = 'word-letter-container';
            const underscore = document.createElement('div');
            underscore.className = 'word-underscore';
            letterContainer.appendChild(underscore);
            this.wordDisplay.appendChild(letterContainer);
        }
    }

    createGrid() {
        const grid = document.querySelector('.bubble-soup');
        grid.innerHTML = '';
        const letters = this.currentWord.split('');
        const extraLetters = this.generateExtraLetters();
        const allLetters = this.shuffleArray([...letters, ...extraLetters]);
        
        const totalCells = this.gridSize * this.gridSize;
        const gridLetters = allLetters.slice(0, totalCells);

        for (let i = 0; i < totalCells; i++) {
            const letter = document.createElement('div');
            letter.className = 'bubble';
            letter.textContent = gridLetters[i];
            
            const { rgba, rgb } = this.getRandomBubbleColor();
            letter.style.setProperty('--bubble-color-rgb', rgb);
            
            letter.addEventListener('click', () => this.selectLetter(letter));
            grid.appendChild(letter);
        }
        
        grid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
    }

    getRandomBubbleColor() {
        const colors = [
            '#FF6F61',
            '#6B5B95',
            '#88B04B',
            '#F7CAC9',
            '#92A8D1',
            '#B565A7',
            '#009B77',
            '#DD4124',
            '#45B8AC',
            '#EFC050',
            '#5B53DA',
            '#FF9E7D',
            '#98B4D4',
            '#C3447A',
            '#88B04B'
        ];
        
        const randomBaseColor = colors[Math.floor(Math.random() * colors.length)];
        
        const hexToRgba = (hex, alpha) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`, rgb: `${r}, ${g}, ${b}` };
        };
        
        return hexToRgba(randomBaseColor, 0.6);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    generateExtraLetters() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const extraLetters = [];
        const needed = (this.gridSize * this.gridSize) - this.currentWord.length;
        
        for (let i = 0; i < needed; i++) {
            extraLetters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        }
        
        return extraLetters;
    }

    selectLetter(bubble) {
        if (!this.isPlaying || bubble.classList.contains('selected') || bubble.classList.contains('exploding')) return;
        
        if (this.selectedLetters.length < this.currentWord.length) {
            const numberOfMiniBubbles = 8;
            for (let i = 0; i < numberOfMiniBubbles; i++) {
                const miniBubble = document.createElement('div');
                miniBubble.className = 'mini-bubble';
                
                const angle = (i / numberOfMiniBubbles) * 2 * Math.PI;
                const spreadDistance = 40;
                const x = spreadDistance * Math.cos(angle) + (Math.random() - 0.5) * 10;
                const y = spreadDistance * Math.sin(angle) + (Math.random() - 0.5) * 10;
                
                miniBubble.style.setProperty('--x', `${x}px`);
                miniBubble.style.setProperty('--y', `${y}px`);
                miniBubble.style.animationDelay = `${Math.random() * 0.2}s`;
                
                bubble.appendChild(miniBubble);
            }

            bubble.classList.add('exploding');
            bubble.style.pointerEvents = 'none';
            
            const popSound = new Audio('sonido/Efecto de sonido burbuja POP.mp3');
            popSound.play();
            
            bubble.addEventListener('animationend', () => {
            }, { once: true });

            this.selectedLetters.push(bubble);
            this.updateWordDisplay();
            
            if (this.selectedLetters.length === this.currentWord.length) {
                setTimeout(() => {
                    this.checkWord();
                }, 100);
            }
        }
    }

    updateWordDisplay() {
        const letterContainers = this.wordDisplay.querySelectorAll('.word-letter-container');

        letterContainers.forEach(container => {
            const selectedLetter = container.querySelector('.selected-word-letter');
            if (selectedLetter) {
                container.removeChild(selectedLetter);
            }
        });

        this.selectedLetters.forEach((selectedBubble, index) => {
            if (index < letterContainers.length) {
                const selectedChar = selectedBubble.textContent;
                const selectedLetterDiv = document.createElement('div');
                selectedLetterDiv.className = 'selected-word-letter';
                selectedLetterDiv.textContent = selectedChar;
                letterContainers[index].appendChild(selectedLetterDiv);
            }
        });
    }

    checkWord() {
        if (this.selectedLetters.length !== this.currentWord.length) {
            return;
        }

        const selectedWord = this.selectedLetters.map(bubble => bubble.textContent).join('');

        if (selectedWord === this.currentWord) {
            this.correctWords.push(this.currentWord);
            this.score += 500;
            this.updateScore();
            this.feedbackMessageElement.textContent = '';

            this.selectedLetters.forEach(bubble => bubble.classList.remove('selected'));
            this.selectedLetters = [];

            setTimeout(() => {
                this.resetBubbleState();
                this.loadRandomImage();
                this.selectWordFromImage();
                this.createGrid();
                this.clock.reset();
                this.clock.start();
            }, 1000);
        } else {
            this.feedbackMessageElement.textContent = 'Palabra incorrecta';

            setTimeout(() => {
                this.selectedLetters.forEach(bubble => {
                    bubble.classList.remove('exploding');
                    
                    const miniBubbles = bubble.querySelectorAll('.mini-bubble');
                    miniBubbles.forEach(mini => mini.remove());

                    bubble.style.opacity = 1;
                    bubble.style.pointerEvents = 'auto';
                });

                this.selectedLetters = [];
                this.updateWordDisplay();
                
                this.feedbackMessageElement.textContent = '';
            }, 1000);
        }
    }

    updateScore() {
        document.querySelector('.points-number').textContent = this.score;
    }

    showEndGameScreen() {
        if (!this.isActive) return; // <--- Solo muestra si el juego sigue activo
        this.isPlaying = false;
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('endgame-screen').style.display = 'block';
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('player-name').value = '';
    }

    loadBestGames() {
        const bestGames = JSON.parse(localStorage.getItem('bestGames') || '[]');
        const container = document.querySelector('.bestgames-container');
        container.innerHTML = bestGames.map(game => `
            <div class="bestgame">
                <p>Puntuación: ${game.score}</p>
                <p>Fecha: ${game.date}</p>
            </div>
        `).join('');
    }

    changeDifficulty(selector) {
        const difficulty = selector.querySelector('.dificulty-title').textContent.toLowerCase();
        this.difficulty = difficulty;
        
        document.querySelectorAll('.dificulty-selector').forEach(s => s.classList.remove('selected'));
        selector.classList.add('selected');

        switch(difficulty) {
            case 'facil':
                this.gridSize = 5;
                this.timeLimit = 30;
                break;
            case 'normal':
                this.gridSize = 7;
                this.timeLimit = 20;
                break;
            case 'dificil':
                this.gridSize = 9;
                this.timeLimit = 10;
                break;
        }
        
        this.clock = new Reloj('time-number', 'hourglassCanvas', this.timeLimit);
        
        if (this.isPlaying) {
             this.resetBubbleState();
             this.loadRandomImage();
             this.selectWordFromImage();
             this.createGrid();
             this.clock.reset();
             this.clock.start();
        } else {
             this.clock = new Reloj('time-number', 'hourglassCanvas', this.timeLimit);
        }
    }

    resetBubbleState() {
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach(bubble => {
            bubble.classList.remove('selected', 'exploding');
            const { rgb } = this.getRandomBubbleColor();
            bubble.style.setProperty('--bubble-color-rgb', rgb);
            bubble.style.pointerEvents = 'auto';
        });
    }

    useHint() {
        const wordDisplay = document.getElementById('word-display');
        const currentLetters = Array.from(wordDisplay.querySelectorAll('.selected-word-letter')).map(e => e.textContent);
        const targetWord = this.currentWord;

        // Busca el primer índice donde falta la letra
        let hintIndex = -1;
        for (let i = 0; i < targetWord.length; i++) {
            if (!currentLetters[i] || currentLetters[i] === "") {
                hintIndex = i;
                break;
            }
        }
        // Si ya está completa la palabra o solo falta la última letra, deshabilita el botón y no hagas nada
        const letrasFaltantes = targetWord.length - currentLetters.filter(l => l && l !== "").length;
        const hintButton = document.getElementById('hint-button');
        if (hintIndex === -1 || letrasFaltantes <= 1) {
            if (hintButton) hintButton.disabled = true;
            return;
        }

        const hintLetter = targetWord[hintIndex];

        // Busca la burbuja con esa letra
        const bubbles = document.querySelectorAll('.bubble');
        let bubbleToClick = null;
        for (let bubble of bubbles) {
            if (bubble.textContent.trim().toUpperCase() === hintLetter.toUpperCase()) {
                bubbleToClick = bubble;
                break;
            }
        }
        if (!bubbleToClick) return; // No hay burbuja disponible

        // Simula el click en la burbuja (esto debería poner la letra y eliminar la burbuja)
        bubbleToClick.click();

        // Penaliza los puntos (permite puntaje negativo)
        if (typeof this.score === 'number') {
            this.score -= 200;
            document.querySelector('.points-number').textContent = this.score;
        } else if (typeof this.points === 'number') {
            this.points -= 200;
            document.querySelector('.points-number').textContent = this.points;
        }

        // Si después de usar la pista solo queda una letra, deshabilita el botón
        setTimeout(() => {
            const updatedLetters = Array.from(wordDisplay.querySelectorAll('.selected-word-letter')).map(e => e.textContent);
            const updatedFaltantes = targetWord.length - updatedLetters.filter(l => l && l !== "").length;
            if (hintButton && updatedFaltantes <= 1) {
                hintButton.disabled = true;
            }
        }, 100);
    }
}

// Al iniciar una nueva palabra
const hintButton = document.getElementById('hint-button');
if (hintButton) hintButton.disabled = false;

window.Game = Game;

