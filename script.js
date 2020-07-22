/* Deklarasi proses di calculator-screen */
const calculatorScreen = document.querySelector('.calculator-highlight')

const addNumber = (number) => {
    calculatorScreen.value = prevScreen + number
    gotAnswer = false
}

const addOperator = (operator) => {
    calculatorScreen.value += operator
    prevScreen = calculatorScreen.value
    gotAnswer = false
}

const getAnswer = (number, sign) => {
    updateHistory(calculatorScreen.value + sign)
    calculatorScreen.value = number
}

const calculatorHistory = document.querySelector('.calculator-history')

const updateHistory = (operation) => {
    calculatorHistory.innerHTML = operation
}

/* Variabel untuk dasar operasi */
let prevNumber = ''
let calculationOperator = ''
let currentNumber = '0'
let prevScreen = ''
let gotAnswer = false
let sign = ' ='

/* Kode ketika numbers ditekan */
const numbers = document.querySelectorAll(".number")

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        addNumber(currentNumber)
    })
})

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number
    } else if (gotAnswer) {
        updateHistory(currentNumber)
        currentNumber = number
    } else {
        currentNumber += number
    }
}


/* Kode ketika operators ditekan */
const operators = document.querySelectorAll('.operator')

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
        addOperator(operator.value)
    })
})

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber
    } else if (gotAnswer) {
        updateHistory(currentNumber)
        calculate()
        prevNumber = currentNumber
    } else {
        calculate()
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = '0'
}


/* Kode ketika equal-sign ditekan */
const equalSign = document.querySelector('.equal-sign')

equalSign.addEventListener('click', () => {
    calculate()
    getAnswer(currentNumber, sign)
})

const calculate = () => {
    let result = ''
    switch(calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case "-":
            result = prevNumber - currentNumber
            break
        case "*":
            result = prevNumber * currentNumber
            break
        case "/":
            result = prevNumber / currentNumber
            break
        case "%":
            result = prevNumber % currentNumber
            break
        default:
            result = '0'
            break
    }

    currentNumber = result
    calculationOperator = ''
    prevScreen = ''
    gotAnswer = true
}


/* Kode ketika AC ditekan */
const clearBtn = document.querySelector('.all-clear')

clearBtn.addEventListener('click', () => {
    // updateHistory(currentNumber, '')
    clearAll()
    getAnswer(currentNumber, '')
})

clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
    prevScreen = ''
}

/* Kode untuk angka desimal */
const decimal = document.querySelector('.decimal')

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    addNumber(currentNumber)
})

inputDecimal = (dot) => {
    currentNumber += dot
}