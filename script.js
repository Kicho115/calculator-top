const operators = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

let a, b;
const display = document.getElementById('display');
const inputButtons = document.getElementById('input');

inputButtons.addEventListener('click',(e) => {
    if (!(e.target.tagName === 'BUTTON')) {
        return;
    }
    const input = e.target.innerText;

    updateDisplay(input);

    !a ? a = input : b = input;
    console.log(a, b);
    
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
    } else {
        display.innerText += input;
    }
}

