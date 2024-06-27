package org.retaileasy.retaileasyserver.dtos.payment;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentStatusDto {
    private String code;
    private String desc;
    private PaymentStatusDataDto data;
    private String signature;
}
