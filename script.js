// Calculator JavaScript

let firstNumber = '';
let secondNumber = '';
let operatorHold = '';
let result = '';

const numPad = document.querySelectorAll('.num, .operator');
const clearBtn = document.querySelector('.clear-display');
const deleteBtn = document.querySelector('.delete-digit');
const decimalBtn = document.querySelector('.decimal');
const equalSign = document.querySelector('.equal-btn');
const topDisplay = document.querySelector('.top-display');
const bottomDisplay = document.querySelector('.bottom-display');

numPad.forEach(btnNum => {
    btnNum.addEventListener('click', clickHandler);
})

clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteLastNum);
equalSign.addEventListener('click', calculate);
decimalBtn.addEventListener('click', checkDecimal);

document.addEventListener('keydown', (e) => {
    const numReg = /^\d+/;
    if (e.key.match(numReg)) {
        appendToDisplay(e.key);
    } else if (isOperator(e.key)) {
        assignOperator(e.key);
    } else if (e.key == 'Enter') {
        calculate();
    } else if (e.key == 'Backspace' || e.key == 'Delete') {
        deleteLastNum();
    } else if (e.key == '.') {
        checkDecimal();
    }
})

function clickHandler(e) {
    let btnText = e.target.value;
    if (isOperator(btnText)) {
        assignOperator(btnText);
    } else {
        appendToDisplay(btnText);
    }
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operatorHold = '';
    topDisplay.textContent = '';
    bottomDisplay.textContent = '0';
}

function deleteLastNum() {
    if (bottomDisplay.textContent == '' || bottomDisplay.textContent == '0') {
        bottomDisplay.textContent = '0';
        return null;
    }
    if (isOperator(operatorHold)) {
        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
        bottomDisplay.textContent = secondNumber;
    } else {
        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
        bottomDisplay.textContent = firstNumber;
    }
}

function calculate() {
    if (isEmpty()) {
        bottomDisplay.textContent = '0';
        return null;
    }
    if (firstNumber != '' && secondNumber == '' && result != '') {
        result = firstNumber;
        bottomDisplay.textContent = result;
        return null;
    }
    if (bottomDisplay.textContent == '' && result != '') {
        bottomDisplay.textContent = result;
    } else {
        result = operate();
        topDisplay.textContent = firstNumber + ' ' + operatorHold;
        bottomDisplay.textContent = result;
    }
}

function appendToDisplay(input) {
    if (operatorHold == '') {
        firstNumber += input;
        bottomDisplay.textContent = firstNumber;
    } else {
        secondNumber += input;
        bottomDisplay.textContent = secondNumber;
    }
}

function assignOperator(input) {
    if (isEmpty()) {
        return null;
    }
    if(isOperator(topDisplay.textContent.slice(-1)) && secondNumber == ''){
        operatorHold = input;
        topDisplay.textContent = firstNumber + " " + convertOperator(operatorHold);
        return null;
    }
    if(operatorHold != '') {
        firstNumber = operate();
    }
    operatorHold = input;
    topDisplay.textContent = firstNumber + ' ' + convertOperator(operatorHold);
    secondNumber = '';
    bottomDisplay.textContent = '';
    if (firstNumber != '') {
        result = firstNumber;
    }
}

function isEmpty() {
    return (firstNumber == '' && secondNumber == '');
}

function isOperator(btnText) {
    return (btnText == '/' || btnText == '*' || btnText == '-' || btnText == '+');
}

function checkDecimal() {
    if (topDisplay.textContent == '') {
        if(firstNumber.includes('.')) {
            return null;
        } else {
            appendToDisplay('.');
        }
    } else {
        if(secondNumber.includes('.')) {
            return null;
        } else {
            appendToDisplay('.');
        }
    }
}

function convertOperator(operator) {
    switch(operator) {
        case '+' :
            return '\x2b';
        case '-' :
            return `\u2212`;
        case '*' :
            return `\xD7`;
        case '/' :
            return `\xF7`;
        default :
            return null;
    }
} 

function add(a, b) {
    return Math.floor((a + b)*10)/10;
}

function subtract(a, b) {
    return Math.floor((a - b)*10)/10;
}

function multiply(a, b) {
    return Math.floor((a * b)*10)/10;
}

function divide(a, b) {
    if (b == 0) {
        clear();
        return 'No division by 0!';
    }
    return Math.floor((a / b)*10)/10;
}

function operate() {
    let a = +firstNumber;
    let b = +secondNumber;
    switch(operatorHold) {
        case '+' :
            return add(a, b);
            break;
        case '-' :
            return subtract(a, b);
            break;
        case '*' :
            return multiply(a, b);
            break;
        case '/' :
            return divide(a, b);
    }
}
