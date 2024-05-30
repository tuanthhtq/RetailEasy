package org.retaileasy.retaileasyserver.dtos.auth;


import lombok.Getter;
import lombok.Setter;
import org.retaileasy.retaileasyserver.dtos.UserDataDto;

@Getter
@Setter
public class CreateAdminResponseDto extends AuthResponseDto {
    private String storeName;

    public CreateAdminResponseDto(int status, String message) {
        super(status, message);
    }

    public CreateAdminResponseDto(int status, UserDataDto user, String message, String storeName) {
        super(status, user, message);
        this.storeName = storeName;
    }
}
