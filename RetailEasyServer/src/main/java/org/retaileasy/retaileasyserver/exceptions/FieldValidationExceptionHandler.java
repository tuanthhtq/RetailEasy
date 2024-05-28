package org.retaileasy.retaileasyserver.exceptions;


import org.retaileasy.retaileasyserver.dtos.AuthResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class FieldValidationExceptionHandler {


//    public ResponseEntity<AuthResponseDto> handleFieldException(MethodArgumentNotValidException ex){
//        List<String> details = new ArrayList<>();
//        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
//            details.add(error.getField() + ": " + error.getDefaultMessage());
//        }
//        ErrorResponse errorResponse = new ErrorResponse("Validation Failed", details);
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//
//    }

}
