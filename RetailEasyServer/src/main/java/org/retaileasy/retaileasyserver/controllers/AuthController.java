package org.retaileasy.retaileasyserver.controllers;


import jakarta.validation.Valid;
import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.UserDataDto;
import org.retaileasy.retaileasyserver.dtos.auth.*;
import org.retaileasy.retaileasyserver.services.auth.AuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthServices authServices;

    @Autowired
    public AuthController( AuthServices au ){
        this.authServices = au;
    }

    @PostMapping("/login")
    ResponseEntity<CommonResponseDto<UserDataDto>> login(
            @Valid @RequestBody LoginRequestDto request,
            BindingResult bindingResult
    ){
        CommonResponseDto<UserDataDto> response = authServices.authenticate(request, bindingResult);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/create-account")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    ResponseEntity<CommonResponseDto<UserDataDto>> createAccount(
            @Valid @RequestBody CreateAccountRequestDto request,
            BindingResult bindingResult
    ){
        CommonResponseDto<UserDataDto> response = authServices.createAccount(request, bindingResult);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/create-admin")
    ResponseEntity<CommonResponseDto<UserDataDto>> createAdmin(
            @Valid @RequestBody CreateAdminRequestDto request,
            BindingResult bindingResult
    ){
        CommonResponseDto<UserDataDto> response = authServices.createAdminAccount(request, bindingResult);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/admin-exists")
    ResponseEntity<CommonResponseDto<Boolean>> adminExists() {
        CommonResponseDto<Boolean> response = authServices.anyUserExists();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
