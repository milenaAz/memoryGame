'use strict'

const icons = ["fa-anchor", "fa-anchor", "fa-automobile", "fa-automobile", "fa-heart", "fa-heart",
				 "fa-bicycle", "fa-bicycle", "fa-camera", "fa-camera", "fa-cloud",
				  "fa-cloud", "fa-coffee", "fa-coffee", "fa-cube", "fa-cube"];

let openedCards = [];
let matchedPairs = 0;
let moves = 0;

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

/*
*  Counts the moves
*/
function moveCounter() {
	const movesEl = document.querySelector('.moves');
	moves++;
	movesEl.innerHTML = moves + " ";
	if(moves > 2 && moves <= 5 ){
		rating(2);	
	}
	else if (moves > 6 ) {
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

/* this function runs when compared cards match.
If cards match then cards should stay opened */
function matched() {
	// openedCards[0].classList.toggle('disable');
	// openedCards[1].classList.toggle('disable');
	openedCards = [];
	matchedPairs++;
}

/* this function runs when compared cards not match.
If cards not match then cards should close */
function unmatched() {
	openedCards[0].classList.toggle('unmatched');
	openedCards[1].classList.toggle('unmatched');

	setTimeout( function(){
		
		openedCards[0].classList.remove('show', 'open', 'unmatched', 'disable');
		openedCards[1].classList.remove('show', 'open', 'unmatched', 'disable');
		openedCards = [];
		}, 500);
}

/*
*  Opens the modal 
*/
function modalPopup(){
	const modal = document.querySelector('.modal');
	const close = document.querySelector('.close');
	
	modal.style.display = 'block';
	close.addEventListener('click', function() {
		modal.style.display = 'none';
	});
}

function gameOver() {
	if(matchedPairs === 8) {
		modalPopup();
	}
}

createDeck();
// shuffle(icons);
addIcons();

const cards = document.querySelectorAll('.card');

for (let card of cards){
    card.addEventListener('click', openCard );
    card.addEventListener('click', compareCards );
    card.addEventListener('click', gameOver );
}
	

