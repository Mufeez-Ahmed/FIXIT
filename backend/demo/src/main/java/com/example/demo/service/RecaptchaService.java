package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class RecaptchaService {

    @Value("${google.recaptcha.secret}")
    private String secretKey;

    private static final String GOOGLE_RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    public boolean verify(String token) {
        if (token == null || token.isEmpty()) return false;

        RestTemplate restTemplate = new RestTemplate();
        
        // Google expects a POST request with these parameters
        String url = GOOGLE_RECAPTCHA_VERIFY_URL + "?secret=" + secretKey + "&response=" + token;
        
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return (Boolean) response.get("success");
        } catch (Exception e) {
            return false; // If Google API is down or timeout
        }
    }
}
