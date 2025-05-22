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
        this.clock = new Reloj('time-number', 'hourglassCanvas', this.timeLimit);
        this.wordDisplay = document.getElementById('word-display');
        this.gamePhotoElement = document.querySelector('.game-photo');
        this.feedbackMessageElement = document.getElementById('feedback-message');
        this.initializeGame();
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

    startGame() {
        this.isPlaying = true;
        this.score = 0;
        this.updateScore();
        this.loadRandomImage();
        this.selectWordFromImage();
        this.createGrid();
        this.startTimer();
    }

    loadRandomImage() {
        let imagesForDifficulty = [];
        switch (this.difficulty) {
            case 'facil':
                imagesForDifficulty = this.images; // Currently, this.images only has easy images
                break;
            case 'normal':
                // In a real scenario, you would load images from the 'medium' folder here.
                // For now, let's assume this.images will contain all images or fetch from correct folder.
                 console.warn('Loading images for normal difficulty - ensure correct image list is loaded.');
                 // Placeholder: If this.images contained all, filter or load medium specific
                 imagesForDifficulty = this.images.filter(img => 
                     words.medium.includes(img.replace('.jpg', '').toUpperCase()));
                // If images are not preloaded or available in this.images, fetch dynamically:
                // fetch('img/words/medium').then(...).then(mediumImages => imagesForDifficulty = mediumImages); 
                // For this example, assuming this.images has all or we fetch medium specific
                 if (imagesForDifficulty.length === 0 && this.images.length > 0) {
                     // Fallback or adjust if this.images doesn't contain medium words
                     console.warn('Medium images not found in current list, using easy images as fallback.');
                     imagesForDifficulty = this.images; // Fallback to easy if medium not found
                 }
                break;
            case 'dificil':
                // Similar to normal, load images from 'hard' folder.
                 console.warn('Loading images for dificil difficulty - ensure correct image list is loaded.');
                 // Placeholder: If this.images contained all, filter or load hard specific
                 imagesForDifficulty = this.images.filter(img => 
                     words.hard.includes(img.replace('.jpg', '').toUpperCase()));
                 // If images are not preloaded or available in this.images, fetch dynamically:
                 // fetch('img/words/hard').then(...).then(hardImages => imagesForDifficulty = hardImages); 
                 // For this example, assuming this.images has all or we fetch hard specific
                 if (imagesForDifficulty.length === 0 && this.images.length > 0) {
                     // Fallback or adjust if this.images doesn't contain hard words
                     console.warn('Hard images not found in current list, using easy images as fallback.');
                     imagesForDifficulty = this.images; // Fallback to easy if hard not found
                 }
                break;
        }

        // Ensure we have images to select from
        if (imagesForDifficulty.length === 0) {
            console.error('No images available for selected difficulty.');
            // Potentially handle this error, e.g., revert to default difficulty or show error message
            return;
        }

        const randomImage = imagesForDifficulty[Math.floor(Math.random() * imagesForDifficulty.length)];
        this.gamePhotoElement.src = `img/words/${this.difficulty === 'facil' ? 'easy' : this.difficulty}/${randomImage}`;
        // Set alt text to filename without extension - this will be the word to guess
        this.gamePhotoElement.alt = randomImage.replace('.jpg', '').toUpperCase(); // Use uppercase for consistency
    }

    selectWordFromImage() {
        // Get the word directly from the alt text of the loaded image
        this.currentWord = this.gamePhotoElement.alt;
        // Ensure the word is in uppercase for consistency with listwords.js
        this.currentWord = this.currentWord.toUpperCase();
        this.displayWordProgress(); // Display underscores based on this word
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
            '#FF6F61', // Coral
            '#6B5B95', // Lavender
            '#88B04B', // Green
            '#F7CAC9', // Pink
            '#92A8D1', // Light Blue
            '#B565A7', // Purple
            '#009B77', // Emerald
            '#DD4124', // Red
            '#45B8AC', // Turquoise
            '#EFC050', // Yellow
            '#5B53DA', // Blue
            '#FF9E7D', // Peach
            '#98B4D4', // Sky Blue
            '#C3447A', // Magenta
            '#88B04B'  // Green
        ];
        
        const randomBaseColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Convert hex to RGBA and RGB
        const hexToRgba = (hex, alpha) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { rgba: `rgba(${r}, ${g}, ${b}, ${alpha})`, rgb: `${r}, ${g}, ${b}` };
        };
        
        return hexToRgba(randomBaseColor, 0.6); // 60% opacity
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
            // Añadir mini-burbujas
            const numberOfMiniBubbles = 8; // Puedes ajustar la cantidad
            for (let i = 0; i < numberOfMiniBubbles; i++) {
                const miniBubble = document.createElement('div');
                miniBubble.className = 'mini-bubble';
                
                // Calcular posición y dirección aleatoria para las mini-burbujas
                const angle = (i / numberOfMiniBubbles) * 2 * Math.PI; // Ángulo para distribuir las burbujas
                const spreadDistance = 40; // Distancia a la que se separan las mini-burbujas
                const x = spreadDistance * Math.cos(angle) + (Math.random() - 0.5) * 10; // Añadir un poco de aleatoriedad
                const y = spreadDistance * Math.sin(angle) + (Math.random() - 0.5) * 10;
                
                miniBubble.style.setProperty('--x', `${x}px`);
                miniBubble.style.setProperty('--y', `${y}px`);
                miniBubble.style.animationDelay = `${Math.random() * 0.2}s`; // Retraso aleatorio para un efecto más natural
                
                bubble.appendChild(miniBubble);
            }

            bubble.classList.add('exploding');
            bubble.style.pointerEvents = 'none';
            
            // Eliminar la burbuja principal después de la animación
            bubble.addEventListener('animationend', () => {
                // bubble.remove(); // Eliminado para dejar el espacio vacío
            }, { once: true }); // Usar { once: true } para que el listener se elimine automáticamente

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

        // Clear all previously displayed letters above underscores
        letterContainers.forEach(container => {
            const selectedLetter = container.querySelector('.selected-word-letter');
            if (selectedLetter) {
                container.removeChild(selectedLetter);
            }
        });

        // Display selected letters in the order they were selected
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
        // Only check the word if the number of selected letters matches the word length
        if (this.selectedLetters.length !== this.currentWord.length) {
            return; // Do nothing if not enough letters are selected
        }

        // Construct the selected word from the selected bubbles in order
        const selectedWord = this.selectedLetters.map(bubble => bubble.textContent).join('');

        if (selectedWord === this.currentWord) {
            console.log('Word Guessed!', this.currentWord);
            this.correctWords.push(this.currentWord);
            this.score += 10; // Adjust scoring as needed
            this.updateScore();
            // Clear feedback message
            this.feedbackMessageElement.textContent = '';

            // Deselect bubbles and clear selected letters after a correct guess
            this.selectedLetters.forEach(bubble => bubble.classList.remove('selected'));
            this.selectedLetters = [];

            // Start next round after a delay
            setTimeout(() => {
                this.resetBubbleState(); // Reset bubbles before loading next word/grid
                this.loadRandomImage();
                this.selectWordFromImage();
                this.createGrid(); // createGrid will assign new colors and event listeners
                this.clock.reset();
                this.clock.start();
            }, 1000); // 1 second delay for correct guess
        } else {
            console.log('Incorrect word.');
            // Display incorrect word message
            this.feedbackMessageElement.textContent = 'Palabra incorrecta';

            // Clear selected letters and word display after a delay on incorrect guess
            setTimeout(() => {
                // Iterar sobre las letras seleccionadas incorrectamente y hacerlas reaparecer
                this.selectedLetters.forEach(bubble => {
                    bubble.classList.remove('exploding');
                    
                    // Eliminar solo las mini-burbujas
                    const miniBubbles = bubble.querySelectorAll('.mini-bubble');
                    miniBubbles.forEach(mini => mini.remove());

                    bubble.style.opacity = 1; // Asegurar visibilidad
                    bubble.style.pointerEvents = 'auto'; // Habilitar clics de nuevo
                    // No añadir la clase 'selected' de nuevo aquí si queremos que los campos se limpien
                    // bubble.classList.add('selected'); 
                });

                // Limpiar la lista de letras seleccionadas ANTES de actualizar la visualización
                this.selectedLetters = [];

                // Limpiar la visualización de la palabra (los espacios)
                this.updateWordDisplay(); 
                
                // Clear feedback message after delay
                this.feedbackMessageElement.textContent = '';
            }, 1000); // 1 second delay for incorrect guess feedback and message display
        }
    }

    updateScore() {
        document.querySelector('.points-number').textContent = this.score;
    }

    startTimer() {
        this.clock.reset();
        this.clock.start();
        
        const gameTimerCheck = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(gameTimerCheck);
                this.clock.stop();
            }
        }, 1000);
    }

    endGame() {
        this.isPlaying = false;
        this.clock.stop();
        this.saveScore();
        this.showGameOver();
    }

    saveScore() {
        const bestGames = JSON.parse(localStorage.getItem('bestGames') || '[]');
        bestGames.push({
            score: this.score,
            date: new Date().toLocaleDateString()
        });
        bestGames.sort((a, b) => b.score - a.score);
        localStorage.setItem('bestGames', JSON.stringify(bestGames.slice(0, 5)));
    }

    showGameOver() {
        document.getElementById('game-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
        this.loadBestGames();
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
             this.resetBubbleState(); // Reset bubbles before loading new word/grid
             this.loadRandomImage(); // Load new image
             this.selectWordFromImage(); // Select new word from image
             this.createGrid(); // Create new grid based on updated gridSize
             this.clock.reset(); // Reset and start timer with new time limit
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
}

window.Game = Game;