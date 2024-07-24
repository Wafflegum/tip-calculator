const billInput = document.getElementById('bill')
const headcountInput = document.getElementById('headcount-input')

const choices = document.querySelectorAll('.tip-choice')

const tip5 = document.getElementById('tip-5')
const tip10 = document.getElementById('tip-10')
const tip15 = document.getElementById('tip-15')
const tip25 = document.getElementById('tip-25')
const tip50 = document.getElementById('tip-50')
const custom = document.getElementById('tip-custom')

const tipResult = document.getElementById('tip-amount')
const headcountResult = document.getElementById('headcount-result')

const resetBtn = document.getElementById('reset-btn')

let bill = 0
let tip = 0
let totalPerPerson = 0

let headcount = 0

let tipPercentage = 0

let customTip

billInput.addEventListener('input', () => {
    bill = parseFloat(billInput.value)

    CalculateTip(tipPercentage)
})

headcountInput.addEventListener('input', () => {
    headcount = parseFloat(headcountInput.value)

    CalculateTip(tipPercentage)

    if (parseFloat(headcountInput.value) <= 0) {
        headcountInput.parentElement.style.outline = '1px solid red'
    } else {
        headcountInput.parentElement.style.outline = '0'
    }
})

function CalculateTip(percentage) {
    console.log(
        `bill: ${bill}, tipPercentage: ${tipPercentage}, headcount: ${headcount}`
    )
    if (tipPercentage > 0 && headcount > 0 && bill > 0) {
        tip = (bill * (percentage / 100)) / headcount
        totalPerPerson = (bill + tip) / headcount

        tip = tip.toFixed(2)
        totalPerPerson = parseFloat(totalPerPerson).toFixed(2)

        tipResult.innerHTML = `$${tip}`
        headcountResult.innerHTML = `$${totalPerPerson}`
    }
}

function SelectButton(element) {
    choices.forEach((choice) => {
        if (choice !== custom) {
            choice.style.background = 'hsl(183, 100%, 15%)'
            choice.style.color = 'white'
        }
    })

    element.style.background = 'hsl(185, 41%, 84%)'
    element.style.color = 'hsl(183, 100%, 15%)'
}

function Reset() {
    bill = 0
    headcount = 0
    tip = 0

    billInput.value = ''
    headcountInput.value = ''
}

resetBtn.addEventListener('click', () => {
    location.reload()
})

tip5.addEventListener('click', () => {
    tipPercentage = 5
    CalculateTip(tipPercentage)
    SelectButton(tip5)
})
tip10.addEventListener('click', () => {
    tipPercentage = 10
    CalculateTip(tipPercentage)
    SelectButton(tip10)
})
tip15.addEventListener('click', () => {
    tipPercentage = 15
    CalculateTip(tipPercentage)
    SelectButton(tip15)
})
tip25.addEventListener('click', () => {
    tipPercentage = 25
    CalculateTip(tipPercentage)
    SelectButton(tip25)
})
tip50.addEventListener('click', () => {
    tipPercentage = 50
    CalculateTip(tipPercentage)
    SelectButton(tip50)
})

custom.addEventListener('click', () => {
    if (customTip == null) {
        customTip = document.createElement('input')

        customTip.setAttribute('type', 'number')

        custom.replaceChild(customTip, custom.firstChild)
    }

    // customTip.setAttribute('placeholder', '0')

    customTip.addEventListener('input', () => {
        tipPercentage = customTip.value
        CalculateTip(tipPercentage)
    })

    SelectButton(custom)

    custom.style.background = 'white'
    custom.style.outline = '2.5px solid hsl(172, 67%, 45%)'

    customTip.focus()
})
