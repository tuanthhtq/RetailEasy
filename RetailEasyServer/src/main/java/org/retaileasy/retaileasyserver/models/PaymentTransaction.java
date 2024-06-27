package org.retaileasy.retaileasyserver.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentTransaction {
    private String accountNumber;
    private int amount;
    private int counterAccountBankId;
    private String counterAccountBankName;
    private int counterAccountNumber;
    private String counterAccountName;
    private String description;
    private String reference;
    private String transactionDateTime;
    private String virtualAccountName;
    private int virtualAccountNumber;
}
