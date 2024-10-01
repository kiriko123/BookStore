package com.bookstore.be.controller;

import com.bookstore.be.dto.request.PaymentRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) throws StripeException {
        // Số tiền ở đây là tính theo đồng VND, không cần chuyển đổi thành cent
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(paymentRequest.getAmount()) // Số tiền (đơn vị: đồng VND)
                .setCurrency("vnd") // Đặt đơn vị tiền tệ là VND
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", intent.getClientSecret());

        return response;
    }

}

