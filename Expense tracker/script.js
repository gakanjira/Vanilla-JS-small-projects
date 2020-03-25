const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const lsit = document.getElementById('lsit');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const addTransactionDOM = transaction => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount * 1)

  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const income = amounts.filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2)

  balance.innerText = `$${total}`
  moneyPlus.innerText = `$${income}`
  moneyMinus.innerText = `$${expense}`
}

const removeTransaction = id => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorageTranscation();

  init();
}

const addTransaction = e => {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amout');
  } else {
    const transaction = {
      id: generateRandomId(),
      text: text.value,
      amount: amount.value
    }

    transactions.push(transaction);

    addTransactionDOM(transaction)

    updateValues();

    updateLocalStorageTranscation();

    text.value = '';
    amount.value = '';
  }
}

const generateRandomId = () => {
  return Math.floor(Math.random() * 42432414219)
}

const updateLocalStorageTranscation = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const init = () => {
  list.innerHTML = '';

  if (transactions) {
    transactions.forEach(addTransactionDOM);
    updateValues();
  } else {
    return false;
  }
}

init();

form.addEventListener('submit', addTransaction)