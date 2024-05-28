package org.retaileasy.retaileasyserver.utils;


import org.retaileasy.retaileasyserver.dtos.UserDataDto;
import org.retaileasy.retaileasyserver.models.User;

import java.util.stream.Collectors;

public class DtoMapper {

    public static UserDataDto toUserDataDto(User user, String accessToken){
        return new UserDataDto(
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getPassword(),
                accessToken,
                user.getAddress(),
                user.getUserRoles().stream().map(role -> role.getRole().getRoleName()).collect(Collectors.toSet())
        );
    }
}
