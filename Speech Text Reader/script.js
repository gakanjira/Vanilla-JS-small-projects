const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const createBox = item => {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class='info'>${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active')
    setTimeout(() => {
      box.classList.remove('active');
    }, 1000)
  });

  main.appendChild(box);
}

let voices = [];

const getVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

const setTextMessage = text => {
  message.text = text;
}

const speakText = () => {
  speechSynthesis.speak(message);
}

data.forEach(createBox);

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggle.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
)

closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
)

voicesSelect.addEventListener('change', e => {
  message.voice = voices.find(voice => voice.name === e.target.value)
})

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText()
})

const message = new SpeechSynthesisUtterance();
getVoices();