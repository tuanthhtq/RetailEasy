package org.retaileasy.retaileasyserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@AllArgsConstructor
@Getter
public class UserDataDto {
    private String username;
    private String fullName;
    private String email;
    private String phone;
    private String password;
    private String token;
    private String address;
    private Set<String> roles;
}
