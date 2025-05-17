class OpcionesScreen{
    constructor(game){
        document.getElementById('mode-easy').addEventListener('click', () => {
            game.ChangeDifficulty('easy');
        })
        document.getElementById('mode-medium').addEventListener('click', () => {
            game.ChangeDifficulty('medium');
        })
        document.getElementById('mode-hard').addEventListener('click', () => {
            game.ChangeDifficulty('hard');
        })
    }
}

export default OpcionesScreen;