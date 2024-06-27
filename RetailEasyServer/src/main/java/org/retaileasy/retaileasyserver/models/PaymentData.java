package org.retaileasy.retaileasyserver.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentData {
    private String id;
    private int orderCode;
    private int amount;
    private int amountPaid;
    private int amountRemaining;
    private String status;
    private String createdAt;
    private List<PaymentTransaction> transactions;
    private String canceledAt;
    private String cancellationReason;

}
