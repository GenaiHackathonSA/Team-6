// currency_converter/conversion_service.js

// Import necessary modules or functions if needed
// Example: const { convert_currency } = require('./path_to_conversion_function'); 

/**
 * Convert Currency Function
 * This function will take in the validated amount along with the source and target currencies 
 * and provide the converted amount. It will leverage any existing conversion functions if they are available.
 *
 * @param {number} amount - The amount of money to convert.
 * @param {string} source - The currency code of the source currency.
 * @param {string} target - The currency code of the target currency.
 * @returns {object} - An object containing the original amount and the converted amount.
 */
async function convertCurrency(amount, source, target) {
    const response = await convert_currency(source, target, amount);
    
    if (response.error) {
        throw new Error(response.error);
    }

    return {
        source: response.source,
        target: response.target,
        amount: response.amount,
        converted_amount: response.converted_amount
    };
}

/**
 * Input Amount Function
 * This function serves as the entry point to initiate the conversion process,
 * invoking the handleAmountInput function and passing the valid amount to 
 * the convertCurrency function.
 *
 * @param {number} amount - The validated amount to convert.
 * @param {string} source - The currency code of the source currency.
 * @param {string} target - The currency code of the target currency.
 * @returns {Promise<object>} - The result of the currency conversion.
 */
async function inputAmount(amount, source, target) {
    try {
        // Ensure that amount is valid
        if (amount <= 0) {
            throw new Error("Amount must be a positive number.");
        }
        
        const convertedData = await convertCurrency(amount, source, target);
        return convertedData;
    } catch (error) {
        console.error(`Error during currency conversion: ${error.message}`);
        throw new Error("Failed to convert currency.");
    }
}

// Export the functions for use in other modules
module.exports = {
    convertCurrency,
    inputAmount
};
