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
	@NotBlank(message = "Phone number is required")
	private String phone;
	@NotBlank(message = "Password is required")
	private String password;
}
