// Get the display element
const display = document.getElementById('display');

// Get all the buttons
const buttons = document.querySelectorAll('.buttons button');

// Variables to hold the current expression and last operator
let currentExpression = '';
let lastOperator = '';

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle button clicks
function handleButtonClick(event) {
    const value = event.target.value;

    // Handle different button values
    switch (value) {
        case 'C':
            currentExpression = '';
            lastOperator = '';
            updateDisplay('');
            break;
        case 'CE':
            currentExpression = currentExpression.slice(0, -1);
            updateDisplay(currentExpression);
            break;
        case '←':
            if (currentExpression.length > 0) {
                currentExpression = currentExpression.slice(0, -1);
                updateDisplay(currentExpression);
            }
            break;
        case '=':
            try {
                // Replace '×' and '÷' with '*' and '/' for eval
                currentExpression = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
                let result = eval(currentExpression);
                
                // If the result is an integer, display it as is, otherwise, fix to 2 decimal places
                result = Number.isInteger(result) ? result : result.toFixed(2);

                updateDisplay(result);
                currentExpression = result.toString();
            } catch (error) {
                updateDisplay('Error');
                currentExpression = '';
            }
            break;
        case '%':
            if (currentExpression) {
                currentExpression = (parseFloat(currentExpression) / 100).toString();
                updateDisplay(currentExpression);
            }
            break;
        default:
            currentExpression += value;
            updateDisplay(currentExpression);
            break;
    }
}

// Attach event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
