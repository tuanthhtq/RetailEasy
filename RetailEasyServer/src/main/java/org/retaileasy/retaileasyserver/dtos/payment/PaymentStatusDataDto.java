package org.retaileasy.retaileasyserver.dtos.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentStatusDataDto {
    private int orderCode;
    private int amount;
    private String status;
    private String createdAt;
}
