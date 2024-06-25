package org.retaileasy.retaileasyserver.services.payment;

import org.retaileasy.retaileasyserver.dtos.payment.PaymentDetailDto;
import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;

public interface PaymentServices {
    PaymentResponseDto createPaymentRequest(PaymentDetailDto request);
}
