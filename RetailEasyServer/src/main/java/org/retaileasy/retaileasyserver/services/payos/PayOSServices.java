package org.retaileasy.retaileasyserver.services.payos;

import org.retaileasy.retaileasyserver.dtos.payment.PaymentRequestDto;

public interface PayOSServices {
    byte[] createPaymentRequest(PaymentRequestDto request);
}
