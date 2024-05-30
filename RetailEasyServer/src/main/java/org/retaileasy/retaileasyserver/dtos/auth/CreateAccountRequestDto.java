package org.retaileasy.retaileasyserver.dtos.auth;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class CreateAccountRequestDto {
    private String username;
    private String idNumber;
    private String phone;
    private String email;
    private String password;
    private String fullName;
    private String address;
    private Set<String> roles;

    public CreateAccountRequestDto(String username, String idNumber, String phone, String email, String password, String fullName, String address, Set<String> roles) {
        this.username = username;
        this.idNumber = idNumber;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.address = address;
        this.roles = roles;
    }
}
