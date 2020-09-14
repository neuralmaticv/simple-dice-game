let scores, roundScore, activePlayer, gamePlaying;
const firstDice = document.getElementById('dice-1');
const secondDice = document.getElementById('dice-2');
const firstDiceScr = document.getElementById('score-0');
const secondDiceScr = document.getElementById('score-1');
const firstPlayer = document.querySelector('.player-0-panel');
const secondPlayer = document.querySelector('.player-1-panel');
const firstPlayerName = document.getElementById('name-0');
const secondPlayerName = document.getElementById('name-1');
const firstPlayerCurrentScr = document.getElementById('current-0');
const secondPlayerCurrentScr = document.getElementById('current-1');
const newGameBtn = document.querySelector('.btn-new');
const rollDiceBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');

let init = () => {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    firstDice.style.display = 'none';
    secondDice.style.display = 'none';
    firstDiceScr.textContent = '0';
    secondDiceScr.textContent = '0';
    firstPlayerCurrentScr.textContent = '0';
    secondPlayerCurrentScr.textContent = '0';

    firstPlayerName.textContent = 'Player 1';
    secondPlayerName.textContent = 'Player 2';

    firstPlayer.classList.remove('winner');
    secondPlayer.classList.remove('winner');
    firstPlayer.classList.remove('active');
    secondPlayer.classList.remove('active');
    firstPlayer.classList.add('active');
};

rollDiceBtn.addEventListener('click', () => {
    if ( gamePlaying ) {
        const firstDiceVal = Math.floor(Math.random() * 6) + 1;
        const secondDiceVal = Math.floor(Math.random() * 6) + 1;

        firstDice.style.display = 'block';
        secondDice.style.display = 'block';

        firstDice.src = `images/dice-${firstDiceVal}.png`;
        secondDice.src = `images/dice-${secondDiceVal}.png`;

        if ( firstDiceVal !== 1 && secondDiceVal !== 1 ) {
            roundScore += firstDiceVal + secondDiceVal;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }    
});

holdBtn.addEventListener('click', () => {
    if ( gamePlaying ) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        let inputValue = document.querySelector('.final-score').value;
        let winningScore;
        
        if ( inputValue ) {
            winningScore = inputValue;
        } else {
            winningScore = 100;
        }
        
        if ( scores[activePlayer] >= winningScore ) {
            firstDice.style.display = 'none';
            secondDice.style.display = 'none';
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

let nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    firstDice.style.display = 'none';
    secondDice.style.display = 'none';

    firstPlayerCurrentScr.textContent = '0';
    secondPlayerCurrentScr.textContent = '0';

    firstPlayer.classList.toggle('active');
    secondPlayer.classList.toggle('active');
};

newGameBtn.addEventListener('click', init);
init();