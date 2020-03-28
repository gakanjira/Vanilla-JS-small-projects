const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
  'goku'
];

let randomWord;
let score = 0;
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

const updateTime = () => {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

const timeInterval = setInterval(updateTime, 1000);

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
}

const addWordToDOM = () => {
  randomWord = getRandomWord();

  word.innerHTML = randomWord;
}

const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
}

const gameOver = () => {
  endGameEl.innerHTML = `
    <h1>Time run out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Try again</button>
  `;

  endGameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    e.target.value = '';
    addWordToDOM()
    updateScore()

    if (difficulty === 'easy') {
      time += 5;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 1;
    }
  }
});

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});