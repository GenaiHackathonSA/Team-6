package com.fullStack.expenseTracker.dto.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
public class TransactionRequestDto {

    @NotNull(message = "User email is required!")
    private String userEmail;

    @NotNull(message = "Category id is required!")
    private int categoryId;

    @NotNull(message = "Description is required!")
    @Size(max = 50, message = "Description can have atmost 50 characters!")
    private String description;
    @NotNull()
    private String currency;

    @NotNull(message = "Amount is required!")
    private Double amount;

    @NotNull(message = "Date is required!")
    private LocalDate date;

    // New field for the user's preferred currency
    @NotNull(message = "Preferred currency is required!")
    private String preferredCurrency;
}