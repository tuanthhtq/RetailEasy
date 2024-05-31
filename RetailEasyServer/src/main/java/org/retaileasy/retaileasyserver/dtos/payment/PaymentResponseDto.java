package org.retaileasy.retaileasyserver.dtos.payment;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDto {

    @JsonProperty("code")
    private String code;

    @JsonProperty("desc")
    private String desc;

    @JsonProperty("data")
    private Data data;

    @JsonProperty("signature")
    private String signature;

    // Getters and Setters

    @JsonIgnoreProperties(ignoreUnknown = true)
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Data {

        @JsonProperty("bin")
        private String bin;

        @JsonProperty("accountNumber")
        private String accountNumber;

        @JsonProperty("accountName")
        private String accountName;

        @JsonProperty("amount")
        private long amount;

        @JsonProperty("description")
        private String description;

        @JsonProperty("orderCode")
        private int orderCode;

        @JsonProperty("currency")
        private String currency;

        @JsonProperty("paymentLinkId")
        private String paymentLinkId;

        @JsonProperty("status")
        private String status;

        @JsonProperty("checkoutUrl")
        private String checkoutUrl;

        @JsonProperty("qrCode")
        private String qrCode;
    }
}

