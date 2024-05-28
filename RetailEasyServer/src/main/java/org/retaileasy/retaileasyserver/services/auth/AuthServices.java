package org.retaileasy.retaileasyserver.services.auth;

import org.retaileasy.retaileasyserver.dtos.*;

/**
 * @author tuan
 */


public interface AuthServices {
    CreateAdminResponseDto createAdminAccount(CreateAdminRequestDto request);

    AuthResponseDto authenticate(LoginRequestDto request);
    AuthResponseDto createAccount(CreateAccountRequestDto request);

}
