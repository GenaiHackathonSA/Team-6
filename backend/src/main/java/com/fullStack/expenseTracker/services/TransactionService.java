package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.dto.requests.TransactionRequestDto;
import com.fullStack.expenseTracker.exceptions.CategoryNotFoundException;
import com.fullStack.expenseTracker.exceptions.TransactionNotFoundException;
import com.fullStack.expenseTracker.exceptions.TransactionServiceLogicException;
import com.fullStack.expenseTracker.exceptions.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public interface TransactionService {

        ResponseEntity<ApiResponseDto<?>> addTransaction(TransactionRequestDto transactionRequestDto)
                        throws UserNotFoundException, CategoryNotFoundException, TransactionServiceLogicException;

        ResponseEntity<ApiResponseDto<?>> getTransactionById(Long TransactionId)
                        throws TransactionNotFoundException;

        ResponseEntity<ApiResponseDto<?>> updateTransaction(Long transactionId,
                        TransactionRequestDto transactionRequestDto)
                        throws TransactionNotFoundException, UserNotFoundException, CategoryNotFoundException,
                        TransactionServiceLogicException;

        ResponseEntity<ApiResponseDto<?>> deleteTransaction(Long transactionId)
                        throws TransactionNotFoundException, TransactionServiceLogicException;

        ResponseEntity<ApiResponseDto<?>> getAllTransactions(int pageNumber, int pageSize, String searchKey)
                        throws TransactionServiceLogicException;

        ResponseEntity<ApiResponseDto<?>> getTransactionsByUser(String email, int pageNumber, int pageSize,
                        String searchKey, String sortField, String sortDirec, String transactionType)
                        throws UserNotFoundException, TransactionServiceLogicException;

        default double convertCurrency(String source, String target, double amount) {
                RestTemplate restTemplate = new RestTemplate();
                String url = "http://localhost:8000/convert?source=" + source + "&target=" + target + "&amount="
                                + amount;
                ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
                Map<String, Object> responseBody = response.getBody();
                return (double) responseBody.get("converted_amount");
        }
}