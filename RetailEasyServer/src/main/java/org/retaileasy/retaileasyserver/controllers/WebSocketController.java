package org.retaileasy.retaileasyserver.controllers;


import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;
import org.retaileasy.retaileasyserver.services.payment.PaymentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class WebSocketController {

    @Autowired
    private PaymentServices paymentServices;


    //webhook
    @PostMapping("/test-webhook")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> testWebhook(@RequestBody Object payload){
        return ResponseEntity.ok(payload);
    }

    
    //web socket
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ResponseEntity<PaymentResponseDto> sendMessage(PaymentResponseDto response) {
        paymentServices.checkPaymentStatus(1521868977);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
