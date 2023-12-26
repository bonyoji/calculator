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


function clickHandler(e) {
    let btnText = e.target.value;
    if (isOperator(btnText) && operatorHold === '') {
        operatorHold = btnText;
        bottomDisplay.innerHTML = '';
        topDisplay.innerHTML = firstNumber + ' ' + operatorHold;
    } else if (isOperator(operatorHold)) {
        if (isOperator(btnText)) {
            if (firstNumber.charAt(firstNumber.length) == isOperator(btnText)){
                console.log('here');
            }
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
    if (isOperator(btnText)) {
        if (firstNumber == '') {
            clear();
        } 
    }
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operatorHold = '';
    topDisplay.innerHTML = '';
    bottomDisplay.innerHTML = '0';
    console.log('hi');
}

function deleteLastNum() {
    if (isOperator(operatorHold)) {
        secondNumber = secondNumber.substring(0, secondNumber.length - 1);
        bottomDisplay.innerHTML = secondNumber;
    } else {
        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
        bottomDisplay.innerHTML = firstNumber;
    }
    console.log('bye');
}

function isOperator(btnText) {
    return (btnText == '/' || btnText == 'x' || btnText == '-' || btnText == '+');
}

function calculate() {
    if (bottomDisplay.innerHTML == '' && result != '') {
        clear();
        bottomDisplay.innerHTML = result;
    } else {
        result = operate();
        clear();
        bottomDisplay.innerHTML = result;
    }
}

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
    if (b == 0) {
        clear();
        return 'No division by 0!';
    }
    return a / b;
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
