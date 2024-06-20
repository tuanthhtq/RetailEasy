package org.retaileasy.retaileasyserver.dtos.anonymous;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto {
    @NotEmpty(message = "Họ tên không được để trống")
    @Pattern(regexp = "^[a-zA-ZàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\\s]+$", message = "Tên không đúng định dạng")
    private String name;

    @Pattern(regexp = "^0[1-9][0-9]{8,}$", message = "Số điện thoại không hợp lệ")
    @NotEmpty(message = "Số điện thoại không được để trống")
    private String phone;

    @Length(max = 100, message = "Tối đa 100 ký tự")
    @NotEmpty(message = "Tiêu đề không được để trống")
    private String title;

    @Length(max = 500, message = "Tối đa 500 ký tự")
    private String message;


}
