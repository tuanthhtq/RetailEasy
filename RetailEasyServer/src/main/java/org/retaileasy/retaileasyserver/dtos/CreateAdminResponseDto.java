package org.retaileasy.retaileasyserver.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAdminResponseDto extends AuthResponseDto{
    private String storeName;

    public CreateAdminResponseDto(int status, String message) {
        super(status, message);
    }

    public CreateAdminResponseDto(int status, UserDataDto user, String message, String storeName) {
        super(status, user, message);
        this.storeName = storeName;
    }
}
