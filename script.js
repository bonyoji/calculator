// Calculator JavaScript

let firstNumber = '';
let secondNumber = '';
let operatorHold = '';
let result = '';

const numPad = document.querySelectorAll('.num, .operator');
const clearBtn = document.querySelector('.clear-display');
const deleteBtn = document.querySelector('.delete-digit');
const equalSign = document.querySelector('.equal-btn');
const topDisplay = document.querySelector('.top-display');
const bottomDisplay = document.querySelector('.bottom-display');

numPad.forEach(btnNum => {
    btnNum.addEventListener('click', clickHandler);
})

clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteLastNum);
equalSign.addEventListener('click', calculate);

document.addEventListener('keydown', (e) => {
   if (e.key == '/^[0-9]') {
    appendToDisplay(e.key);
   } else if (isOperator(e.key)) {
    assignOperator(e.key);
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
    if (isOperator(operatorHold)) {
        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
        bottomDisplay.textContent = secondNumber;
    } else {
        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
        bottomDisplay.textContent = firstNumber;
    }
}

function calculate() {
    if (bottomDisplay.textContent == '' && result != '') {
        clear();
        bottomDisplay.textContent = result;
    } else {
        result = operate();
        clear();
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
    if(operatorHold != '') {
        firstNumber = operate();
    }
    operatorHold = input;
    topDisplay.textContent = firstNumber + ' ' + operatorHold;
    secondNumber = '';
    bottomDisplay.textContent = '';
}

function isEmpty() {

}

function isOperator(btnText) {
    return (btnText == '/' || btnText == 'x' || btnText == '-' || btnText == '+');
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
        case 'x' :
            return multiply(a, b);
            break;
        case '/' :
            return divide(a, b);
    }
}
