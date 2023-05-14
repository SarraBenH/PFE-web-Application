package com.pfe.projet.mappers;

import com.pfe.projet.dtos.requests.AlertRequest;
import com.pfe.projet.dtos.requests.MessageRequest;
import com.pfe.projet.dtos.responses.AlertResponse;
import com.pfe.projet.dtos.responses.MessageResponse;
import com.pfe.projet.models.Alert;
import com.pfe.projet.models.Message;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class MessageMapper {

    public static Optional<Message> toMessage(MessageRequest messageRequest) {
        if (messageRequest == null) {
            return Optional.empty();
        }
        Message message = new Message();
        message.setContent(messageRequest.getContent());
        message.setDateMessage(messageRequest.getDateMessage());
        message.setSource(messageRequest.getSource());
        message.setTarget(messageRequest.getTarget());
        return Optional.of(message);
    }

    public static Optional<MessageResponse> toMessageResponse(Message message) {
        if (message == null) {
            return Optional.empty();
        }
        MessageResponse messageResponse = new MessageResponse();
        messageResponse.setId(message.getId());
        messageResponse.setDateMessage(message.getDateMessage());
        messageResponse.setTarget(message.getTarget());
        messageResponse.setSource(message.getSource());
        messageResponse.setContent(message.getContent());

        return Optional.of(messageResponse);
    }
}
