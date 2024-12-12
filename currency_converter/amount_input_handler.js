// currency_converter/amount_input_handler.js

/**
 * Validates if the input is a valid number.
 * @param {string} input - The user input to be validated.
 * @returns {boolean} - Returns true if the input is a positive number, otherwise false.
 */
function validateNumericalInput(input) {
    const number = parseFloat(input);
    // Check if the number is a valid number and greater than zero
    return !isNaN(number) && number > 0;
}

/**
 * Handles the user input for the amount they wish to convert.
 * It validates and processes the input before passing it to the conversion function.
 * Incorporates error handling to ensure the user provides a valid numeric input.
 * @param {string} amountInput - The user input for the amount to convert.
 * @returns {number|null} - Returns the validated amount or null if it's invalid.
 */
function handleAmountInput(amountInput) {
    if (!validateNumericalInput(amountInput)) {
        console.error("Invalid input: Please enter a positive number.");
        return null; // or throw an error based on your error handling strategy
    }
    
    const validAmount = parseFloat(amountInput);
    return validAmount;
}

// Exporting the functions for use in other modules
module.exports = {
    handleAmountInput,
    validateNumericalInput,
};
