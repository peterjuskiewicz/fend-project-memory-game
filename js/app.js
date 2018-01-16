/*
 * Create a list that holds all of your cards
 */
// initialise counters and arrays for storing cards
let count = 0;
let moveCount = 0;
let tempArray = [];
let matchedCards = [];
let isTimerActive = false;




let cardsArray = [
    "<li class='card'><i class='fa fa-diamond'></i></li>",
    "<li class='card'><i class='fa fa-paper-plane-o'></i></li>",
    "<li class='card'><i class='fa fa-anchor'></i></li>",
    "<li class='card'><i class='fa fa-bolt'></i></li>",
    "<li class='card'><i class='fa fa-cube'></i></li>",
    "<li class='card'><i class='fa fa-anchor'></i></li>",
    "<li class='card'><i class='fa fa-leaf'></i></li>",
    "<li class='card'><i class='fa fa-bicycle'></i></li>",
    "<li class='card'><i class='fa fa-diamond'></i></li>",
    "<li class='card'><i class='fa fa-bomb'></i></li>",
    "<li class='card'><i class='fa fa-leaf'></i></li>",
    "<li class='card'><i class='fa fa-bomb'></i></li>",
    "<li class='card'><i class='fa fa-bolt'></i></li>",
    "<li class='card'><i class='fa fa-bicycle'></i></li>",
    "<li class='card'><i class='fa fa-paper-plane-o'></i></li>",
    "<li class='card'><i class='fa fa-cube'></i></li>"
];

const starsArray = [
    "<li><i class='fa fa-star' id='star1'></i></li>",
    "<li><i class='fa fa-star' id='star2'></i></li>",
    "<li><i class='fa fa-star' id='star3'></i></li>"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// get DOM elements


const deck = document.querySelector('.deck');

const moves = document.querySelector('.moves');

const restart = document.querySelector('.restart');

const stars = document.querySelector('.stars');


// shuffle the cards sets and append all cards to the deck

const newCardsSet = () => {
    cardsArray = shuffle(cardsArray);

    deck.innerHTML = "";

    stars.innerHTML = "";

    sec = 0;

    for (let i = 0; i < cardsArray.length; i++) {
        deck.innerHTML += cardsArray[i];
    }
    console.log('new set created');

    for (let i = 0; i < starsArray.length; i++) {
        stars.innerHTML += starsArray[i];
    }
    moveCount = 0;
    moves.innerHTML = moveCount;
}






// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// count up timer

let sec = 0;

const pad = (val) => {return val > 9 ? val : "0" + val;}

const deckCards = document.querySelectorAll('.card')

function startTimer() {

    isTimerActive = true;

    setInterval(() => {
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
}




const displayCard = (event) => {
    if (event.target.tagName == "LI" && count < 2) {
        event.target.setAttribute('class', 'card open show');
        count++;
        moveCount++;
        removeStar();
        tempArray.push(event.target);
        matchCard();
        if(tempArray.length == 2){
            hideCard(event);
        }
        winGame();
        moves.innerHTML = moveCount;
    }

}

const hideCard = (event) => {
    setTimeout(function() {
        if (!matchedCards.includes(event.target)) {
            for (let i = 0; i < tempArray.length; i++) {
                tempArray[i].setAttribute('class', 'card');
            }
        }
        tempArray = [];
        count = 0;
    }, 1000);

}

const matchCard = () => {
    if (tempArray.length == 2) {
        if (tempArray[0].innerHTML == tempArray[1].innerHTML) {
            tempArray[0].setAttribute('class', 'card match');
            matchedCards.push(tempArray[0]);
            tempArray[1].setAttribute('class', 'card match');
            matchedCards.push(tempArray[1]);
        }
    }
}

const winGame = () => {
    if (matchedCards.length === cardsArray.length) {
        const winningMessage =
            `<div class='winning-message'>
                <h1>Congratulations! You won!</h1>
                <h2>It took ${document.getElementById('minutes').innerHTML}
                minutes ${document.getElementById('seconds').innerHTML}
                seconds with ${moveCount} moves and
                ${document.querySelectorAll('.fa-star').length} stars</h2>
                <button onclick='newCardsSet()'>RESET</button>
            </div>`;
        deck.innerHTML = winningMessage;
    }
}

const removeStar = () => {
    if(moveCount == 25){
        document.getElementById('star1').remove();
        console.log('star removed');

    }
    else if (moveCount == 50){
        document.getElementById('star2').remove();
    }
}



deck.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('you clicked ' + event.target.tagName);
    displayCard(event);
    !isTimerActive && startTimer();
});

restart.addEventListener('click', newCardsSet);

document.addEventListener('DOMContentLoaded', newCardsSet);