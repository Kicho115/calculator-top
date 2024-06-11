const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

let inputFunction = [];
let isInputComplete = false;
let isOpSelected = false;

const display = document.getElementById('display');
const inputButtons = document.getElementById('input');

inputButtons.addEventListener('click',(e) => {
    if (!(e.target.tagName === 'BUTTON')) {
        return;
    }
    const input = e.target.innerText;

    updateDisplay(input);

    if (isNaN(parseInt(input)) && input !== '.' && input != 'AC') {
        if (!isOpSelected) {
            isOpSelected = true;
            inputFunction.push(input);
        }
        inputFunction = transformArray(inputFunction);
        updateIsInputComplete(inputFunction);
        console.log(isInputComplete);
    } else if (input !== 'AC') {
        inputFunction.push(input);

    }
    
})

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
        return;
    }

    return a / b;
}

function operate(str) {
    const operation = str.split(' ');
    const a = operation[0];
    const op = operation[1];
    const b = operation[2];

    return operators[op](a, b);
}

function updateDisplay(input) {
    if (input === 'del') {
        display.innerText = display.innerText.substring(0, display.innerText.length - 1);
    } else if (input === 'AC') {
        reset();
    } else {
        display.innerText += input;
    }
}

function transformArray(arr) {
    const opIndex = arr.findIndex(item => isNaN(parseInt(item)) && item !== '.');
    const a = arr.slice('0', opIndex).join('');
    const b = arr.slice(opIndex + 1).join('');
    const op = arr[opIndex];

    return [a, op, b];
}

function updateIsInputComplete(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            isInputComplete = false;
            return;
        }
    }
    isInputComplete = true;
}

function reset() {
    inputFunction = [];
    isOpSelected = false;
    display.innerText = '';
}