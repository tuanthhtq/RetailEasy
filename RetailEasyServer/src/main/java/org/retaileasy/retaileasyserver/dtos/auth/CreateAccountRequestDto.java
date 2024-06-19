package org.retaileasy.retaileasyserver.dtos.auth;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class CreateAccountRequestDto {
    @NotEmpty(message = "Username không được để trống")
    private String username;

    @NotEmpty(message = "Số CCCD không được để trống")
    private String idNumber;

    @Pattern(regexp = "^0[1-9][0-9]{8,}$", message = "Số điện thoại không hợp lệ")
    @NotEmpty(message = "Số điện thoại không được để trống")
    private String phone;

    @Pattern(regexp = ".+@.+\\..+", message = "Email không hợp lệ")
    private String email;

    @NotEmpty(message = "Mật khẩu không được để trống")
    private String password;

    @NotEmpty(message = "Họ tên không được để trống")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Tên không đúng định dạng")
    private String fullName;

    @NotEmpty(message = "Địa chỉ không được để trống")
    private String address;

    private Set<String> roles;

    public CreateAccountRequestDto(String idNumber, String phone, String email, String password, String fullName, String address, Set<String> roles) {
        this.username = phone;
        this.idNumber = idNumber;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.address = address;
        this.roles = roles;
    }
}
