package org.retaileasy.retaileasyserver.services.payos;

import org.retaileasy.retaileasyserver.dtos.payment.PaymentRequestDto;
import org.retaileasy.retaileasyserver.utils.HMACHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class PayOSServicesImpl implements PayOSServices{

    private final String payOSEndpoint = "https://api-merchant.payos.vn/v2/payment-requests";
    private final String clientId = "e7d74972-d7d4-466e-81b2-74765d555334";
    private final String apiKey = "cf8ef373-05dc-486c-a015-f4cac57a99b0";

    private final RestTemplate restTemplate;

    @Autowired
    public PayOSServicesImpl(RestTemplate rt){
        this.restTemplate = rt;
    }

    @Override
    public String createPaymentRequest(PaymentRequestDto paymentRequest) {

        String data = String.format("amount=%d&cancelUrl=%s&description=%s&orderCode=%d&returnUrl=%s",
                paymentRequest.getAmount(), paymentRequest.getCancelUrl(), paymentRequest.getDescription(),
                paymentRequest.getOrderCode(), paymentRequest.getReturnUrl());

        System.out.println(data);

        String signature = HMACHelper.hmacSha256(data);

        System.out.println(signature);

        paymentRequest.setSignature(signature);
        HttpHeaders headers = new HttpHeaders();

//        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("x-client-id", clientId);
        headers.set("x-api-key", apiKey);
        HttpEntity<PaymentRequestDto> request = new HttpEntity<>(paymentRequest, headers);

        ResponseEntity<String> response = restTemplate.exchange(payOSEndpoint, HttpMethod.POST, request, String.class);
        return response.getBody();
    }
}
