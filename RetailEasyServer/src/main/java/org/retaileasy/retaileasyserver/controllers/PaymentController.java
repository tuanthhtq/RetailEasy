package org.retaileasy.retaileasyserver.controllers;


import org.retaileasy.retaileasyserver.dtos.payment.PaymentRequestDto;
import org.retaileasy.retaileasyserver.services.payos.PayOSServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/payment")
public class PaymentController {

    private final PayOSServicesImpl payOSServices;

    @Autowired
    public PaymentController(PayOSServicesImpl ps){
        this.payOSServices = ps;
    }

    @PostMapping("/create-payment")
    @PreAuthorize("permitAll()")
    public ResponseEntity<byte[]> createPaymentRequest(@RequestBody PaymentRequestDto request){

        byte[] qr = payOSServices.createPaymentRequest(request);
        return new ResponseEntity<>(qr, HttpStatus.OK);
    }

}
