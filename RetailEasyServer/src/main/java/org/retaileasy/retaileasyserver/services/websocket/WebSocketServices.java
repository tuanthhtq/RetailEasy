package org.retaileasy.retaileasyserver.services.websocket;

import org.retaileasy.retaileasyserver.dtos.payment.PaymentResponseDto;
import org.retaileasy.retaileasyserver.models.PaymentStatusResponse;

public interface WebSocketServices {


    void notify(String destination, PaymentStatusResponse message);
}
