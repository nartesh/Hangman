/* Script code */


/* All popup displays */
let popup = document.getElementById('popup-container');
/* For final notifications */
let finalMessage = document.getElementById('final-message');


/* Array that contains several examples of words that can be guessed */
let array = ['barcelona','messi','liverpool','gerrard','roma','totti','rapid','hagi'];

/* The word received randomly from the available array */
let selectedWord = array[Math.floor(Math.random()* array .length)];

/* Arrays for case the letters are correct and in case they are incorrect */
let correctLetters = [];
let incorrectLetters = [];


/* Display the correct letters and the final message if the word has been guessed */
function displayWord() {
	/* The word to be guessed */
	let word = document.getElementById('word');
	word.innerHTML =
    `${selectedWord
        .split('')
        .map(letter => `
			<span class="letter">${correctLetters.includes(letter)?letter:''}</span>
        `).join('')
    }`
	/* Fill in the blanks with the correct letters */
    let innerWord = word.innerText.replace(/\n/g,'');
    if(innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You escaped with your life!';
		popup.style.display = 'flex';
    }
}

/* Update for incorrect letters */
function updateWrongLetter() {
    /* Display wrong letters */
	/* Wrong letters */
	let wordLetter = document.getElementById('wrong-letters');
	/* For graphic construction */
	let figureParts = document.querySelectorAll('.figure-part');
	wordLetter.innerHTML = `
    ${incorrectLetters.length>0?'<p>wrong letters</p>':''}
    ${incorrectLetters.map(letter=>`<span>${letter}</span>`)}
	`    
	/* Display parts figure in pieces depending on the letters */
	figureParts.forEach((part, index) => {
		let wrong = incorrectLetters.length;
		if(index < wrong) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	})
	/* Checking if I lost and displaying the corresponding message */
	if(incorrectLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately, you are hanged!';
		popup.style.display = 'flex';
	}
}

/* Show notifications and time of appearance and disappear in case a letter has already been used */
function showNotification() {
	/* Notifications if a letter is pressed several times */
	let notification = document.getElementById('notification-container');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000)
}

/* Concatenating the letters for each case and displaying a notification */
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        let letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!incorrectLetters.includes(letter)) {
                incorrectLetters.push(letter);
                updateWrongLetter();
            } else {
                showNotification();
            }
        }
    }
})

/* Play again the game */
function playAgain(){   
    /* To start a new game, reset the arrays and notifications and randomly word */
	correctLetters.splice(0);
    incorrectLetters.splice(0);
    selectedWord = array[Math.floor(Math.random() * array.length)];
    displayWord();
    updateWrongLetter();
    popup.style.display = 'none';         
}

/* Start a new game after the previous one ends, by clicking on the "Play Again!" Notification message. */
/* When a new game starts */
let playAgainButton = document.getElementById('play-button');
playAgainButton.addEventListener('click',playAgain);
window.addEventListener('keydown', (e) => {
    if(e.keyCode === 0) {
        playAgain();
    }
})


displayWord();