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

function operate(operator, a, b) {
    switch(operator) {
        case '+' :
            add(a, b);
            break;
        case '-' :
            subtract(a, b);
            break;
        case 'x' :
            multiply(a, b);
            break;
        case '/' :
            divide(a, b);
    }
}

const numPad = document.querySelectorAll('.num');
const operatorPad = document.querySelectorAll('.operator');

numPad.forEach(btnNum => {
    btnNum.addEventListener('click', strToDisplay);
})

operatorPad.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', strToDisplay);
})

const topDisplay = document.querySelector('.top-display');
const operatorDisplay = document.querySelector('.mid-display');
const bottomDisplay = document.querySelector('.bottom-display');

const displayNum = {};
let displayVal = '0';

function strToDisplay(e) {
    let btnText = e.target.innerText;
    if (displayVal == '0') {
        displayVal = '';
    }
    displayVal += btnText;
    bottomDisplay.innerText = displayVal;
}


