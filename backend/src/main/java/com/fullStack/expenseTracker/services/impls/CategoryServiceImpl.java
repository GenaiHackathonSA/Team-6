
package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.dto.requests.CategoryRequestDto;
import com.fullStack.expenseTracker.exceptions.TransactionTypeNotFoundException;
import com.fullStack.expenseTracker.services.CategoryService;
import com.fullStack.expenseTracker.services.TransactionTypeService;
import com.fullStack.expenseTracker.dto.reponses.ApiResponseDto;
import com.fullStack.expenseTracker.enums.ApiResponseStatus;
import com.fullStack.expenseTracker.exceptions.CategoryNotFoundException;
import com.fullStack.expenseTracker.exceptions.CategoryServiceLogicException;
import com.fullStack.expenseTracker.models.Category;
import com.fullStack.expenseTracker.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionTypeService transactionTypeService;

    @Override
    public ResponseEntity<ApiResponseDto<?>> getCategories() {
        return ResponseEntity.ok(
                new ApiResponseDto<>(
                        ApiResponseStatus.SUCCESS,
                        HttpStatus.OK,
                        categoryRepository.findAll()
                )
        );
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> createCategory(CategoryRequestDto categoryRequestDto) throws TransactionTypeNotFoundException {
        Category category = new Category(
                categoryRequestDto.getCategoryName(),
                transactionTypeService.getTransactionById(categoryRequestDto.getTransactionTypeId()),
                categoryRequestDto.isEnabled()
        );
        categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponseDto<>(
                        ApiResponseStatus.SUCCESS, HttpStatus.CREATED, "Category has been created successfully!"
                )
        );
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> updateCategory(int categoryId, CategoryRequestDto categoryRequestDto) throws CategoryNotFoundException, TransactionTypeNotFoundException {
        Category category = getCategoryById(categoryId);
        category.setCategoryName(categoryRequestDto.getCategoryName());
        category.setTransactionType(transactionTypeService.getTransactionById(categoryRequestDto.getTransactionTypeId()));
        category.setEnabled(categoryRequestDto.isEnabled());
        categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponseDto<>(
                        ApiResponseStatus.SUCCESS, HttpStatus.OK, "Category has been updated successfully!"
                )
        );
    }

    @Override
    public boolean existsCategory(int id) {
        return categoryRepository.existsById(id);
    }

    @Override
    public Category getCategoryById(int id) throws CategoryNotFoundException {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id" + id));
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> enableOrDisableCategory(int categoryId)
            throws CategoryServiceLogicException, CategoryNotFoundException {
        Category category = getCategoryById(categoryId);

        try {
            category.setEnabled(!category.isEnabled());
            categoryRepository.save(category);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponseDto<>(
                            ApiResponseStatus.SUCCESS, HttpStatus.OK, "Category has been updated successfully!"
                    )
            );
        } catch (Exception e) {
            log.error("Failed to enable/disable category: " + e.getMessage());
            throw new CategoryServiceLogicException("Failed to update category: Try again later!");
        }
    }
}
