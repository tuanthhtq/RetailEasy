package org.retaileasy.retaileasyserver.controllers;


import org.retaileasy.retaileasyserver.dtos.payment.PaymentDetailDto;
import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;
import org.retaileasy.retaileasyserver.services.payment.PaymentServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/payment")
public class PaymentController {

    private final PaymentServicesImpl payOSServices;

    @Autowired
    public PaymentController(PaymentServicesImpl ps){
        this.payOSServices = ps;
    }

    @PostMapping("/create-payment")
    @PreAuthorize("permitAll()")
    public ResponseEntity<PaymentResponseDto> createPaymentRequest(@RequestBody PaymentDetailDto request){

        PaymentResponseDto response = payOSServices.createPaymentRequest(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
