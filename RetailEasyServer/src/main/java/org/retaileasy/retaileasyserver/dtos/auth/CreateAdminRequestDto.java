package org.retaileasy.retaileasyserver.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateAdminRequestDto {
    private String username;
    private String idNumber;
    private String phone;
    private String email;
    private String password;
    private String fullName;
    private String address;
    private String storeName;
}
