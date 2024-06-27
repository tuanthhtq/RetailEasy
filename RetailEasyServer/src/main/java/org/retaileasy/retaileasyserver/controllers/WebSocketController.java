package org.retaileasy.retaileasyserver.controllers;


import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@MessageMapping("api/v1/payment")
public class WebSocketController {

    @SendTo("/payment-status")
    public ResponseEntity<PaymentResponseDto> sendMessage(PaymentResponseDto response) {
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
