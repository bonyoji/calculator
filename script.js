// Calculator JavaScript

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate() {
    switch(operatorHold) {
        case '+' :
            return add(+firstNumber, +secondNumber);
            break;
        case '-' :
            return subtract(+firstNumber, +secondNumber);
            break;
        case 'x' :
            return multiply(+firstNumber, +secondNumber);
            break;
        case '/' :
            return divide(+firstNumber, +secondNumber);
    }
}

const numPad = document.querySelectorAll('button');

numPad.forEach(btnNum => {
    btnNum.addEventListener('click', clickHandler);
})

const topDisplay = document.querySelector('.top-display');
const bottomDisplay = document.querySelector('.bottom-display');

let firstNumber = '';
let secondNumber = '';
let operatorHold = '';
let result = '';

function clickHandler(e) {
    let btnText = e.target.value;
    if (btnText == 'clear') {
        clear();
    }
    else if (isOperator(btnText) && operatorHold === '') {
        operatorHold = btnText;
        bottomDisplay.innerHTML = '';
        topDisplay.innerHTML = firstNumber + ' ' + operatorHold;
    } else if (operatorHold == '/' || operatorHold == 'x' || operatorHold == '-' || operatorHold == '+') {
        if (btnText == '=') {
            result = operate();
            clear();
            bottomDisplay.innerHTML = result;
        } else if (isOperator(btnText)) {
            result = operate();
            operatorHold = btnText;
            firstNumber = result;
            secondNumber = '';
            topDisplay.innerHTML = firstNumber + ' ' + operatorHold;
            bottomDisplay.innerHTML = '';
        } else {
            secondNumber += btnText;
            bottomDisplay.innerHTML = secondNumber;
        }
    } else {
        firstNumber += btnText;
        bottomDisplay.innerHTML = firstNumber;
    }
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operatorHold = '';
    topDisplay.innerHTML = '';
    bottomDisplay.innerHTML = '0';
}

function isOperator(btnText) {
    return (btnText == '/' || btnText == 'x' || btnText == '-' || btnText == '+');
}



