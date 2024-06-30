package org.retaileasy.retaileasyserver.dtos.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateAdminRequestDto {
    @Pattern(regexp = "^[0-9]{10,}$", message = "Số căn cước không hợp lệ")
    @NotEmpty(message = "Số CCCD không được để trống")
    private String idNumber;

    @Pattern(regexp = "^0[1-9][0-9]{8,}$", message = "Số điện thoại không hợp lệ")
    @NotEmpty(message = "Số điện thoại không được để trống")
    private String phone;

    @Pattern(regexp = ".+@.+\\..+", message = "Email không hợp lệ")
    private String email;

    @NotEmpty(message = "Họ tên không được để trống")
    @Pattern(regexp = "^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+\\s*[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]*$", message = "Tên không đúng định dạng")
    private String fullName;

    @NotEmpty(message = "Địa chỉ không được để trống")
    private String address;

    @NotEmpty(message = "Tên cửa hàng không được để trống")
    private String storeName;
}
