'use strict'

const icons = ["fa-anchor", "fa-anchor", "fa-automobile", "fa-automobile", "fa-heart", "fa-heart",
				 "fa-bicycle", "fa-bicycle", "fa-camera", "fa-camera", "fa-cloud",
				  "fa-cloud", "fa-coffee", "fa-coffee", "fa-cube", "fa-cube"];

/* Creates a 8x8 grid*/
function createDeck (){
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

/*Adds icon classes to <td> elements*/
function addIcons(){
	const deck = document.querySelectorAll('td');

	for (let i = 0; i < deck.length; i++){
		deck[i].innerHTML = "<i class=\"fa "+icons[i]+"\"></i>";
	}
}

/*Shuffles the array */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

createDeck();
shuffle(icons);
addIcons();

const cards = document.querySelectorAll('.card');

for (let card of cards){
    card.addEventListener('click', function(e){
    card.classList.toggle('show');
    card.classList.toggle('open');
});
}
	

