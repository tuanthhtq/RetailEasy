package org.retaileasy.retaileasyserver.dtos.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author tuan
 */
@AllArgsConstructor
@Getter
public class LoginRequestDto {
	@NotEmpty(message = "Số điện thoại không được để trống")
	@Pattern(regexp = "^0[1-9][0-9]{8,}$", message = "Số điện thoại không hợp lệ")
	private String phone;

	@NotEmpty(message = "Mật khẩu không được để trống ")
	private String password;
}
