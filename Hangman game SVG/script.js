const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('worng-letters');
const playAgainButton = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'dragon'];
const correctLetters = [];
const wrongLetters = [];

let generatedWord = words[Math.floor(Math.random() * words.length)];

const showNotification = () => {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000)
}

const updateWrongLettersEl = () => {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  })

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'You lost. Try again';
    popup.style.display = 'flex';
  }
}


const displayWord = () => {
  wordEl.innerHTML = `
    ${generatedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `
      )
      .join('')
    }
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === generatedWord) {
    finalMessage.innerText = 'Congratulations! You Won!';
    popup.style.display = 'flex';
  }
}

const playAgain = () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  generatedWord = words[Math.floor(Math.random() * words.length)];


  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
}

window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (generatedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)

        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)

        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }
  }
})

playAgainButton.addEventListener('click', playAgain);

displayWord()