package org.retaileasy.retaileasyserver.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author tuan
 */
@AllArgsConstructor
@Getter
public class LoginRequestDto {
	@NotBlank(message = "Please enter username or phone number.")
	private String usernameOrPhone;
	@NotBlank(message = "Password is required")
	private String password;
}
