package org.retaileasy.retaileasyserver.exceptions;


import org.springframework.web.bind.annotation.ControllerAdvice;

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
