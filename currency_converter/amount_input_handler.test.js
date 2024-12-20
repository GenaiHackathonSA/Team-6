// currency_converter/amount_input_handler.test.js

// Importing necessary functions from the module
const { handleAmountInput, validateNumericalInput } = require('./amount_input_handler');

// Unit tests for handleAmountInput
describe('handleAmountInput', () => {
    test('valid numeric input', () => {
        const validInput = '100';
        const result = handleAmountInput(validInput);
        expect(result).toBe(true);
        // Add any additional assertions based on the expected output of handleAmountInput
    });

    test('invalid input: non-numeric', () => {
        const invalidInput = 'abc';
        expect(() => handleAmountInput(invalidInput)).toThrow('Invalid input: expected a numeric value');
    });

    test('invalid input: negative number', () => {
        const invalidInput = '-50';
        expect(() => handleAmountInput(invalidInput)).toThrow('Invalid input: must be a positive number');
    });

    test('edge case: zero', () => {
        const zeroInput = '0';
        expect(() => handleAmountInput(zeroInput)).toThrow('Invalid input: must be a positive number');
    });
});

// Unit tests for validateNumericalInput
describe('validateNumericalInput', () => {
    test('should return true for valid positive number', () => {
        const result = validateNumericalInput(100);
        expect(result).toBe(true);
    });

    test('should return false for negative number', () => {
        const result = validateNumericalInput(-50);
        expect(result).toBe(false);
    });

    test('should return false for non-numeric input', () => {
        const result = validateNumericalInput('abc');
        expect(result).toBe(false);
    });

    test('should return false for zero', () => {
        const result = validateNumericalInput(0);
        expect(result).toBe(false);
    });
});
