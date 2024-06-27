package org.retaileasy.retaileasyserver.models;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentStatusResponse {
    private String code;
    private String desc;
    private PaymentData data;
    private String signature;

}
