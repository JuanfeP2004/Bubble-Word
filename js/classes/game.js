import ListWords from "../data/listwords.js"

class Game {
    // Game state properties
    tiempo = 30;
    soup_lenght = 5;
    multiplier = 1.0;

    words = new ListWords();
    list = this.words.medium_words;

    actual_word = '';
    actual_image = '';
    guessedWordDisplay = [];
    points = 0;
    reloj = null;

    constructor() {
        // Initialize the game with the first word object on creation
        this.GetWordObject();
    }

    // Set the Reloj instance
    setReloj(reloj) {
        this.reloj = reloj;
    }

    // Get a random word object from the current difficulty list
    GetWordObject() {      
        let index = Math.floor(Math.random() * this.list.length);
        const selectedWordObject = this.list[index];
        this.GetWord(selectedWordObject);
        this.GetImage(selectedWordObject);
        this.initializeGuessedWordDisplay();
        this.updateGamePhotoDisplay();
        // Generate bubble soup for the new word
        this.generateBubbleSoup();
    }

    // Set the current word
    GetWord(object) {
        this.actual_word = object.word;
    }

    // Set the current image path
    GetImage(object) {
        this.actual_image = object.image;
    }

    // Initialize the display for the guessed word (underscores)
    initializeGuessedWordDisplay() {
        this.guessedWordDisplay = Array(this.actual_word.length).fill('_');
        this.updateWordDisplay();
    }

    // Handle a bubble click event with a letter
    handleBubbleClick(letter) {
        const emptyIndex = this.guessedWordDisplay.indexOf('_');
        if (emptyIndex !== -1) {
            this.guessedWordDisplay[emptyIndex] = letter.toLowerCase();
            this.updateWordDisplay();
            
            // Check if the word is complete after the click
            const currentWord = this.guessedWordDisplay.join('');
            if (currentWord === this.actual_word.toLowerCase()) {
                this.handleCorrectGuess();
            }
        }
    }

    // Handle the logic when a word is guessed correctly
    handleCorrectGuess() {
        // Add points
        this.points += 800; // Example point value
        
        // Update points display in the UI
        const pointsElement = document.querySelector('.points-number');
        if (pointsElement) {
            pointsElement.textContent = this.points;
        }

        // Reset and restart timer
        if (this.reloj) {
            this.reloj.reset();
            this.reloj.start();
        }

        // Get a new word and image for the next round
        this.GetWordObject();
        // The bubble soup is now generated within GetWordObject
    }

    // Update the word display in the UI
    updateWordDisplay() {
        const objectiveWordsContainer = document.querySelector('.objective-words');
        if (objectiveWordsContainer) {
            objectiveWordsContainer.innerHTML = this.guessedWordDisplay.map(char => 
                `<span class="word-underline">${char.toUpperCase()}</span>`
            ).join('');
        }
    }

    // Update the game photo display in the UI
    updateGamePhotoDisplay() {
        const gamePhoto = document.querySelector('.game-photo');
        if (gamePhoto) {
            gamePhoto.src = this.actual_image;
        }
    }

    // Probe if a word matches the current actual word (case-insensitive)
    ProbeWord(word, time) { // 'time' parameter seems unused, consider removing if not needed
        if (this.actual_word.toLowerCase() === word.toLowerCase()) {
            this.handleCorrectGuess();
            return true;
        }
        return false;
    }

    // Change the game difficulty
    ChangeDifficulty(newDifficult) {
        switch(newDifficult) {
            case 'easy':
                this.tiempo = 30;
                this.soup_lenght = 5;
                this.multiplier = 1.0;
                this.list = this.words.easy_words;
                break;
            case 'medium':
                this.tiempo = 20;
                this.soup_lenght = 7;
                this.multiplier = 2.0;
                this.list = this.words.medium_words;
                break;
            case 'hard':
                this.tiempo = 15;
                this.soup_lenght = 9;
                this.multiplier = 4.0;
                this.list = this.words.hard_words;
                break;
            default:
                 console.warn('Game: Unknown difficulty', newDifficult); // Added warning for unknown difficulty
        }
        
        // Reset game state when changing difficulty
        this.points = 0;
        const pointsElement = document.querySelector('.points-number');
        if (pointsElement) {
            pointsElement.textContent = '0';
        }
        this.GetWordObject(); // Get a new word for the selected difficulty
    }

    // Generate bubbles for the bubble soup based on the current word and difficulty
    generateBubbleSoup() {
        const bubbleSoupContainer = document.querySelector('.bubble-soup');
        if (!bubbleSoupContainer) return; // Exit if container not found

        bubbleSoupContainer.innerHTML = ''; // Clear previous bubbles

        const wordLetters = this.actual_word.split('');
        const totalBubbles = this.soup_lenght * this.soup_lenght;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        let bubbleLetters = [...wordLetters];

        // Add random letters to fill the total number of bubbles
        while (bubbleLetters.length < totalBubbles) {
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            bubbleLetters.push(randomLetter.toLowerCase());
        }

        // Shuffle the letters randomly
        for (let i = bubbleLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bubbleLetters[i], bubbleLetters[j]] = [bubbleLetters[j], bubbleLetters[i]];
        }

        // Create and append bubble elements
        bubbleLetters.forEach(letter => {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.textContent = letter.toUpperCase();
            
            // Attach click listener to the bubble
            bubble.addEventListener('click', () => {
                this.handleBubbleClick(letter);
            });

            bubbleSoupContainer.appendChild(bubble);
        });
    }
}

export default Game;