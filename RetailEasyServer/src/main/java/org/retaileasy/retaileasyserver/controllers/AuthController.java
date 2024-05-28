package org.retaileasy.retaileasyserver.controllers;


import jakarta.validation.Valid;
import org.retaileasy.retaileasyserver.dtos.AuthResponseDto;
import org.retaileasy.retaileasyserver.dtos.CreateAccountRequestDto;
import org.retaileasy.retaileasyserver.dtos.LoginRequestDto;
import org.retaileasy.retaileasyserver.services.auth.AuthServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthServices authServices;

    public AuthController( AuthServices au ){
        this.authServices = au;
    }

    @PostMapping("/login")
    ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto request){
        AuthResponseDto response = authServices.authenticate(request);

        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/create-account")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<?> createAccount(@RequestBody CreateAccountRequestDto request){
        AuthResponseDto response = authServices.createAccount(request);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

}
