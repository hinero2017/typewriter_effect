//ES6 Class
class TypeWriter {
	constructor(txtElement, words, wait = 1000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 7);
		this.type();
		this.isDeleting = false;
	}
	type() {
		//corrent index of the word
		const current = this.wordIndex % this.words.length;
		//get full text of current word
		const fullTxt = this.words[current];
		//check if deleteing state mode
		if (this.isDeleting) {
			//remove a character
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			//add a character
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
		// insert text into element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		//Type speed
		let typeSpeed = 300;
		if (this.isDeleting) {
			typeSpeed /= 2;
		}
		//if word is complete
		if (!this.isDeleting && this.txt === fullTxt) {
			//this for making a Pause at the end
			typeSpeed = this.wait;
			//set delete to true
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			//move to next word
			this.wordIndex++;
			//Pause before start typing
			typeSpeed = 400;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

// Init on the DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init the TypeWriter
	new TypeWriter(txtElement, words, wait);
}
