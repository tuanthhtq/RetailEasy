package org.retaileasy.retaileasyserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.retaileasy.retaileasyserver.models.User;

/**
 * @author tuan
 */

@Setter
@Getter
public class AuthResponseDto {
    private int status;
    private UserDataDto data;
    private String message;

    public AuthResponseDto(int status, String message){
        this.status = status;
        this.message = message;
    }

    public AuthResponseDto(int status, UserDataDto user, String message){
        this.status = status;
        this.data = user;
        this.message = message;
    }
}
