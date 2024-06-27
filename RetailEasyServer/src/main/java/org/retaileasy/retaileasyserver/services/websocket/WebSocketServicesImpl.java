package org.retaileasy.retaileasyserver.services.websocket;


import org.retaileasy.retaileasyserver.models.PaymentStatusResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketServicesImpl implements WebSocketServices{

    private final SimpMessagingTemplate template;

    @Autowired
    public WebSocketServicesImpl(SimpMessagingTemplate template) {
        this.template = template;
    }


    @Override
    public void notify(String destination, PaymentStatusResponse message) {
        System.out.println(message);
        System.out.println(destination);
        template.convertAndSend(destination, message);
    }
}
