package org.retaileasy.retaileasyserver.services.payment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;
import org.retaileasy.retaileasyserver.dtos.payment.PaymentDetailDto;
import org.retaileasy.retaileasyserver.utils.HMACProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.TimeUnit;


@Service
public class PaymentServicesImpl implements PaymentServices {

    private final String payOSEndpoint = "https://api-merchant.payos.vn/v2/payment-requests";
    private final String clientId = "e7d74972-d7d4-466e-81b2-74765d555334";
    private final String apiKey = "cf8ef373-05dc-486c-a015-f4cac57a99b0";

    private final RestTemplate restTemplate;

    @Autowired
    public PaymentServicesImpl(RestTemplate rt){
        this.restTemplate = rt;
    }

    @Override
    public PaymentResponseDto createPaymentRequest(PaymentDetailDto paymentRequest) {

        //payment data
        String data = String.format("amount=%d&cancelUrl=%s&description=%s&orderCode=%d&returnUrl=%s",
                paymentRequest.getAmount(), paymentRequest.getCancelUrl(), paymentRequest.getDescription(),
                paymentRequest.getOrderCode(), paymentRequest.getReturnUrl());

        //generate signature
        String signature = HMACProvider.hmacSha256(data);
        paymentRequest.setSignature(signature);
        paymentRequest.setOrderCode((int) (System.currentTimeMillis() + paymentRequest.getOrderCode()));

        //set expire
        long expired = System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(10);
        paymentRequest.setExpiredAt(expired);

        //configure request to payos server
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-client-id", clientId);
        headers.set("x-api-key", apiKey);
        HttpEntity<PaymentDetailDto> request = new HttpEntity<>(paymentRequest, headers);
        ResponseEntity<String> response = restTemplate.exchange(payOSEndpoint, HttpMethod.POST, request, String.class);

        //get data from payos server
        if(response.hasBody()){
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                return objectMapper.readValue(responseBody, PaymentResponseDto.class);
            }catch (NullPointerException | JsonProcessingException e){
                e.getLocalizedMessage();
            }
        }
        return null;
    }
}
