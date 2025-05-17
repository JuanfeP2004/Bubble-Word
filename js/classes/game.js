import ListWords from "../data/listwords.js"

class Game{

    tiempo = 30;
    soup_lenght = 5;
    multiplier = 1.0;

    words = new ListWords();
    list = this.words.medium_words;

    actual_word = '';
    actual_image = '';
    points = 0;

    GetWordObject(){      
        let index = Math.floor(Math.random()*this.list.length);
        this.GetWord(this.list[index]);
        this.GetImage(this.list[index]);
    }

    GetWord(object){
        this.actual_word = object.word;
    }

    GetImage(object){
        this.actual_image = object.image;
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