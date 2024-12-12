package com.fullStack.expenseTracker.services.impls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class CurrencyConversionService {

    private final RestTemplate restTemplate;

    @Autowired
    public CurrencyConversionService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public double getConversionRate(String sourceCurrency, String targetCurrency) {
        String url = "http://localhost:8000/convert?source=" + sourceCurrency + "&target=" + targetCurrency + "&amount=1";
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("converted_amount")) {
            return (double) responseBody.get("converted_amount");
        } else {
            throw new RuntimeException("Failed to fetch conversion rate");
        }
    }
}