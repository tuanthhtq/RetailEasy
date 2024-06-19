package org.retaileasy.retaileasyserver.services.auth;

import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.UserDataDto;
import org.retaileasy.retaileasyserver.dtos.auth.*;
import org.springframework.validation.BindingResult;

/**
 * @author tuan
 */


public interface AuthServices {
    CommonResponseDto<UserDataDto> createAdminAccount(CreateAdminRequestDto request, BindingResult bindingResult);
    CommonResponseDto<UserDataDto> authenticate(LoginRequestDto request, BindingResult bindingResult);
    CommonResponseDto<UserDataDto> createAccount(CreateAccountRequestDto request, BindingResult bindingResult);
}
