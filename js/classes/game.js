import ListWords from "../data/listwords.js"

class Game{

    tiempo = 30;
    soup_lenght = 5;
    multiplier = 1.0;

    words = new ListWords();
    list = this.words.medium_words;

    actual_word = '';
    actual_image = '';
    guessedWordDisplay = [];
    points = 0;

    GetWordObject(){      
        let index = Math.floor(Math.random()*this.list.length);
        const selectedWordObject = this.list[index];
        this.GetWord(selectedWordObject);
        this.GetImage(selectedWordObject);
        this.initializeGuessedWordDisplay();
        this.updateGamePhotoDisplay();
    }

    GetWord(object){
        this.actual_word = object.word;
    }

    GetImage(object){
        this.actual_image = object.image;
    }

    initializeGuessedWordDisplay() {
        this.guessedWordDisplay = Array(this.actual_word.length).fill('_');
        this.updateWordDisplay();
    }

    handleBubbleClick(letter) {
        const emptyIndex = this.guessedWordDisplay.indexOf('_');
        if (emptyIndex !== -1) {
            this.guessedWordDisplay[emptyIndex] = letter.toLowerCase();
            this.updateWordDisplay();
        }
    }

    updateWordDisplay() {
        const objectiveWordsContainer = document.querySelector('.objective-words');
        if (objectiveWordsContainer) {
            objectiveWordsContainer.innerHTML = this.guessedWordDisplay.map(char => 
                `<span class="word-underline">${char.toUpperCase()}</span>`
            ).join('');
        }
    }

    updateGamePhotoDisplay() {
        const gamePhoto = document.querySelector('.game-photo');
        if (gamePhoto) {
            gamePhoto.src = this.actual_image;
        }
    }

    ProbeWord(word, time) {
        if (this.actual_word == word){
            this.points += (100 * (1 + (time/100)) * this.multiplier);
        }
        else return false;
    }

    ChangeDifficulty(newDifficult){
        switch(newDifficult){
            case 'easy':
                this.tiempo = 30;
                this.soup_lenght = 5;
                this.multiplier = 1.0;
                this.list = this.words.easy_words;
                alert(this.multiplier);
                break;
            case 'medium':
                this.tiempo = 20;
                this.soup_lenght = 7;
                this.multiplier = 2.0;
                this.list = this.words.medium_words;
                alert(this.multiplier);
                break;
            case 'hard':
                this.tiempo = 15;
                this.soup_lenght = 9;
                this.multiplier = 4.0;
                this.list = this.words.hard_words;
                alert(this.multiplier);
                break;
        }
    }
}

export default Game;