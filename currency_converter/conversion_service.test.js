// currency_converter/conversion_service.test.js

// Importing necessary functions for testing
import { convertCurrency, inputAmount } from './conversion_service';
import { handleAmountInput } from './amount_input_handler';

describe('Currency Conversion Service', () => {
  
    describe('convertCurrency', () => {
        it('should convert USD to EUR correctly', async () => {
            const result = await convertCurrency('usd', 'eur', 100);
            expect(result.converted_amount).toBeDefined();
            expect(result.converted_amount).toBeGreaterThan(0);
            expect(result.source).toBe('usd');
            expect(result.target).toBe('eur');
            expect(result.amount).toBe(100);
        });

        it('should return error for invalid source currency', async () => {
            const result = await convertCurrency('invalid_source', 'eur', 100);
            expect(result.error).toBe('Invalid currency code');
        });

        it('should return error for invalid target currency', async () => {
            const result = await convertCurrency('usd', 'invalid_target', 100);
            expect(result.error).toBe('Invalid currency code');
        });

        it('should handle conversion from non-USD source currency', async () => {
            const result = await convertCurrency('eur', 'usd', 100);
            expect(result.converted_amount).toBeDefined();
            expect(result.converted_amount).toBeGreaterThan(0);
            expect(result.source).toBe('eur');
            expect(result.target).toBe('usd');
            expect(result.amount).toBe(100);
        });
    });

    describe('inputAmount', () => {
        it('should invoke handleAmountInput and then convertCurrency correctly', async () => {
            const amount = 100;
            const sourceCurrency = 'usd';
            const targetCurrency = 'eur';

            const handleAmountInputMock = jest.spyOn({ handleAmountInput }, 'handleAmountInput')
                .mockImplementation(() => Promise.resolve(amount));

            const convertCurrencyMock = jest.spyOn({ convertCurrency }, 'convertCurrency')
                .mockResolvedValue({ result: 'mocked_conversion_result' });

            const result = await inputAmount(sourceCurrency, targetCurrency);
            expect(handleAmountInputMock).toHaveBeenCalledWith(amount);
            expect(convertCurrencyMock).toHaveBeenCalledWith(sourceCurrency, targetCurrency, amount);
            expect(result).toEqual({ result: 'mocked_conversion_result' });

            // Cleanup mocks
            handleAmountInputMock.mockRestore();
            convertCurrencyMock.mockRestore();
        });

        it('should validate the amount before conversion', async () => {
            const invalidAmount = 'NaN';
            const result = await inputAmount('usd', 'eur', invalidAmount);
            expect(result.error).toBe('Invalid input amount');
        });
    });
});
