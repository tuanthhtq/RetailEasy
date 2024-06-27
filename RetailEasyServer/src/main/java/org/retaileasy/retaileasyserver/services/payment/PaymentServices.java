package org.retaileasy.retaileasyserver.services.payment;

import org.retaileasy.retaileasyserver.dtos.payment.PaymentDetailDto;
import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;
import org.retaileasy.retaileasyserver.models.PaymentStatusResponse;

public interface PaymentServices {
    PaymentResponseDto createPaymentRequest(PaymentDetailDto request);

    PaymentStatusResponse checkPaymentStatus(int orderCode);
}
