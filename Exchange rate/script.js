const currecyEl_one = document.getElementById('currency-one')
const currecyEl_two = document.getElementById('currency-two')
const amountEl_one = document.getElementById('amount-one')
const amountEl_two = document.getElementById('amount-two')

const rate = document.getElementById('rate')
const swap = document.getElementById('swap')

const calculate = () => {
    const currencyOne = currecyEl_one.value;
    const currencyTwo = currecyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
            const rateCurrency = data.rates[currencyTwo]
            rate.innerText = `1 ${currencyOne} = ${rateCurrency} ${currencyTwo}`;

            amountEl_two.value = (amountEl_one.value * rateCurrency).toFixed(2)
        })
}

currecyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currecyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currecyEl_one.value;
    currecyEl_one.value = currecyEl_two.value;
    currecyEl_two.value = temp;
    calculate()
})