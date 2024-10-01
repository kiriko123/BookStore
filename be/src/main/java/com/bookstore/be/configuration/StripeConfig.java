package com.bookstore.be.configuration;

import com.stripe.Stripe;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig implements InitializingBean {

    @Value("${stripe.api.key}")
    private String apiKey;

    @Override
    public void afterPropertiesSet() throws Exception {
        Stripe.apiKey = apiKey;
    }
}



