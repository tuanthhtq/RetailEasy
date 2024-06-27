package org.retaileasy.retaileasyserver.controllers;


import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;
import org.retaileasy.retaileasyserver.services.payment.PaymentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private PaymentServices paymentServices;



    @MessageMapping("api/v1/payment")
    @SendTo("/topic/payment-status")
    public ResponseEntity<PaymentResponseDto> sendMessage(PaymentResponseDto response) {
        paymentServices.checkPaymentStatus(1521868977);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
