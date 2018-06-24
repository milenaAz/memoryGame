'use strict'

const icons = ["fa-anchor", "fa-anchor", "fa-automobile", "fa-automobile", "fa-heart", "fa-heart",
				 "fa-bicycle", "fa-bicycle", "fa-camera", "fa-camera", "fa-cloud",
				  "fa-cloud", "fa-coffee", "fa-coffee", "fa-cube", "fa-cube"];

const stars = document.querySelectorAll('.fa-star');
const deck = document.querySelector('tbody');

let openedCards = [];
let matchedPairs = 0;
let moves = 0;
let cardClicked = true;

/* Creates a 8x8 grid */
function createDeck () {
	const docFrag = document.createDocumentFragment();
	const deck = document.querySelector('tbody');

	for (let i = 0; i < 4; i++){
		const row = document.createElement('tr');
		docFrag.appendChild(row);		
		for (let j = 0; j < 4; j++){
			const col = document.createElement('td');
			col.classList.add('card');
			docFrag.appendChild(col);
		}
	}

	deck.appendChild(docFrag);
}

/* Adds icon classes to <td> elements */
function addIcons() {
	const deck = document.querySelectorAll('td');

	for (let i = 0; i < deck.length; i++){
		deck[i].innerHTML = "<i class=\"fa "+icons[i]+"\"></i>";
	}
}

/* Shuffles the array */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/* Show the card */
function openCard() {
	//starts the timer on first click
	if(cardClicked){
		startTimer();
		cardClicked = false;
	}

	this.classList.toggle('show');
    this.classList.toggle('open');
    this.classList.toggle('disable');
}

/* Compares the cards if cards match then call match()
 else calls unmatched() function */
function compareCards() {
	openedCards.push(this);
   
    if(openedCards.length === 2) {
        if(openedCards[0].innerHTML === openedCards[1].innerHTML){      
           matched();
           moveCounter();
        } else {
           unmatched();
           moveCounter();
        }

    }
}

/* this function runs when compared cards match.
If cards match then cards should stay opened */
function matched() {
	openedCards[0].classList.add('matched');
	openedCards[1].classList.add('matched');

	openedCards = [];
	matchedPairs++;
}

/* this function runs when compared cards not match.
If cards not match then cards should close */
function unmatched() {
	openedCards[0].classList.toggle('unmatched');
	openedCards[1].classList.toggle('unmatched');
	disable();

	setTimeout( function(){
		openedCards[0].classList.remove('show', 'open', 'unmatched');
		openedCards[1].classList.remove('show', 'open', 'unmatched');
		openedCards = [];
		enable();
	}, 500);
}

function disable() {
	const cards = document.querySelectorAll('td');
	for(let card of cards){
		card.classList.add('disable');
	}
}

function enable() {
	const cards = document.querySelectorAll('td');
	for(let card of cards){
		if(card.classList.contains('matched') == false){
			card.classList.remove('disable');
		}
	}
}

/*
*  Counts the moves
*/
function moveCounter() {
	const movesEl = document.querySelector('.moves');
	moves++;
	movesEl.innerHTML = moves + " ";

	if(moves >= 13 && moves <= 15){
		rating(2);	
	}
	if(moves > 16) {
		rating(1);
	}
}

/*
*	
*/
function rating(index) {
	const stars = document.querySelectorAll('.fa-star');
	const starToRemove = stars.item(index);
	
	if(starToRemove !== null){
		starToRemove.className ='fa fa-star-o'; 
	}
}

function gameOver() {
	if(matchedPairs === 8) {
		stopTimer();
		modalPopup();
	}
}


let sec = 0;
let min = 0;
let hours = 0;
let timer = document.querySelector('.timer');
let stopWatch;

function startTimer() {
	stopWatch = setInterval(function() {
		timer.innerHTML = `${numberFormat(hours)}:${numberFormat(min)}:${numberFormat(sec)}`;
		sec++;
		if(sec === 60){
			min++;
			sec = 0;
		}
		if(min === 60){
			hours++;
			min = 0;
		}
	},1000);
}

function numberFormat(num) {
	num = num.toString();
	if (num.length < 2){
		num = '0'+num;
	}

	return num;
}

function stopTimer() {
	clearInterval(stopWatch);
}

/*
*  Opens the modal 
*/
function modalPopup(){
	const modal = document.querySelector('.modal');
	const close = document.querySelector('.close');
	const finalMoves = document.querySelector('.display-moves');
	const finalStars = document.querySelector('.display-stars');
	const finalTimer = document.querySelector('.display-timer');
	const stars = document.querySelectorAll('.fa-star');

	modal.style.display = 'block';
	finalMoves.innerHTML = moves;
	finalStars.innerHTML = stars.length;
	finalTimer.innerHTML = `${numberFormat(hours)}:${numberFormat(min)}:${numberFormat(sec-1)}`;
	close.addEventListener('click', function() {
		modal.style.display = 'none';
		startGame();
	});
}

// function restartGame() {
	const restartBtn = document.querySelectorAll('.start-game');
	for( const btn of restartBtn) {
	btn.addEventListener('click', function() {
		stopTimer();
		startGame();
	})
}
// }

function clickCard () {
	const cards = document.querySelectorAll('.card');

	for (let card of cards){
	    card.addEventListener('click', openCard );
	    card.addEventListener('click', compareCards );
	    card.addEventListener('click', gameOver );
	}
}

function resetGame () {
	//remove the deck
	while (deck.firstChild) {
    	deck.removeChild(deck.firstChild);
	}
	//reset moves to 0
	moves = 0; 
	const movesEl = document.querySelector('.moves');
	movesEl.innerHTML = 0 + ' ';

	//reset matchedPairs to 0
	matchedPairs = 0;
	//get all the stars back
	for (let i=0; i<3; i++)
	{
		stars[i].className = 'fa fa-star';
	}
	//reset the timer
	cardClicked = true;
	sec = 0;
	min = 0;
	hours = 0;
	timer.innerHTML = `${numberFormat(hours)}:${numberFormat(min)}:${numberFormat(sec)}`;
}

function startGame() {
	resetGame();
	createDeck();
	// shuffle(icons);
	addIcons();
	clickCard();
}

startGame();


	

