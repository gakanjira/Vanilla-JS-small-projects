const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sort = document.getElementById('sort')
const calculateWealth = document.getElementById('calculate-wealth')

let users = []

const addNewUser = (obj) => {
    users.push(obj)

    updateDOM(users);
}

const getRandomUser = async () => {
    const randomUser = await fetch('https://randomuser.me/api/')
    const data = await randomUser.json()

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    }

    addNewUser(newUser)
}


const updateDOM = (data = users) => {
    main.innerHTML = '<h2><strong>Person</strong>wealth</h2>';

    data.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong>$${item.money}`
        main.appendChild(element)
    })
}

for (let i = 0; i < 5; i++) {
    getRandomUser()
}

const doubleUsersMoney = () => {
    users = users.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDOM()
}

const sortUsersByRichest = () => {
    users = users.sort((a, b) => b.money - a.money)
    updateDOM()
}

const showOnlyMillionaires = () => {
    users = users.filter(user => user.money > 1000000)
    updateDOM()
}

const calculateEntireWealth = () => {
    const total = users.reduce((acc, userMoney) => (acc += userMoney.money), 0)

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total wealth <strong>$${total}</strong></h3>`
    main.appendChild(wealthEl)
}

addUser.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleUsersMoney)
sort.addEventListener('click', sortUsersByRichest)
showMillionaires.addEventListener('click', showOnlyMillionaires)
calculateWealth.addEventListener('click', calculateEntireWealth)