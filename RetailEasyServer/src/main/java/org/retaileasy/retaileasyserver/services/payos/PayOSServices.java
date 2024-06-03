package org.retaileasy.retaileasyserver.services.payos;

import org.retaileasy.retaileasyserver.dtos.payment.PaymentRequestDto;
import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;

public interface PayOSServices {
    PaymentResponseDto createPaymentRequest(PaymentRequestDto request);
}
