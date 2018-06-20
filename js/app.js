'use strict'

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