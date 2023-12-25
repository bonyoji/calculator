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

function operate(operator) {
    switch(operator) {
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
    else if (btnText == '/' || btnText == 'x' || btnText == '-' || btnText == '+') {
        operatorHold = btnText;
        bottomDisplay.innerHTML = '';
        topDisplay.innerHTML = firstNumber + ' ' + operatorHold;
    } else if (operatorHold == '') {
        firstNumber += btnText;
        bottomDisplay.innerHTML = firstNumber;
    } else if (operatorHold == '/' || operatorHold == 'x' || operatorHold == '-' || operatorHold == '+') {
        if (btnText == '=') {
            result = operate(operatorHold);
            clear();
            bottomDisplay.innerHTML = result;
        } else {
            secondNumber += btnText;
            bottomDisplay.innerHTML = secondNumber;
        }
    }
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operatorHold = '';
    topDisplay.innerHTML = '';
    bottomDisplay.innerHTML = '0';
}



