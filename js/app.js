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

createDeck();
addIcons();