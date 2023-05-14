package com.pfe.projet.services;

import com.pfe.projet.dtos.requests.MessageRequest;
import com.pfe.projet.dtos.responses.MessageResponse;
import com.pfe.projet.mappers.MessageMapper;
import com.pfe.projet.models.Message;
import com.pfe.projet.models.User;
import com.pfe.projet.repositories.MessageRepository;
import com.pfe.projet.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService{

    private static final long ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // en millisecondes

    @Autowired
    private MessageRepository messageRepository ;

    @Autowired
    private UserRepository userRepository ;

    @Override
    public Optional<MessageResponse> createMessage(MessageRequest messageRequest) {
        Optional<Message> optionalMessage = MessageMapper.toMessage(messageRequest);
        if(optionalMessage.isPresent()) {
            Message message = messageRepository.save(optionalMessage.get());
            return MessageMapper.toMessageResponse(message);
        }
        return Optional.empty();
    }

    @Override
    public Optional<MessageResponse> getMessageById(Long id) {
        Optional<Message> messageOptional = messageRepository.findById(id);
        if(messageOptional.isPresent()) {
            return MessageMapper.toMessageResponse(messageOptional.get());
        }
        return Optional.empty();
    }

    @Override
    public void deleteMessagesByIds(List<Long> ids) {
        if(!ids.isEmpty()) {
            ids.forEach((id) -> {
                deleteMessageById(id);
            });
        }
    }

    @Override
    public void deleteMessageById(Long id) {
        if(messageRepository.existsById(id)) {
            messageRepository.deleteById(id);
        }
    }

    @Override
    public List<MessageResponse> getAllMessagesByUserId(String userId) {
        List<Message> messages = messageRepository.getAllByTarget(userId);
        List<MessageResponse> messageResponseList = new ArrayList<>();
        messages.forEach((message)->{
            Optional<MessageResponse> optionalMessageResponse = MessageMapper.toMessageResponse(message);
            optionalMessageResponse.ifPresent(messageResponseList::add);
        });
        return messageResponseList;
    }

   /* @Scheduled(fixedRate = 3600000) // toutes les heures
    public void cleanupMessages() {
        // Supprimer les messages de plus d'une semaine
        Instant oneWeekAgo = Instant.now().minusMillis(ONE_WEEK);
        List<Message> oldMessages = messageRepository.getOldMessages(oneWeekAgo);
        if (!CollectionUtils.isEmpty(oldMessages)){
            messageRepository.deleteAll(oldMessages);

            // Mettre à jour les alert_ids des utilisateurs
            List<User> users = userRepository.findAll();
            for (User user : users) {
                if (user.getMessage_ids()!=null){
                    List<Long> messageIds = Arrays.asList(user.getMessage_ids());
                    List<Long> oldMessagesIds = oldMessages.stream().map(Message::getId).collect(Collectors.toList());
                    messageIds = messageIds.stream().filter(((aLong -> !oldMessagesIds.contains(aLong)))).collect(Collectors.toList());
                    if (CollectionUtils.isEmpty(messageIds)){
                        user.setMessage_ids(null);
                    }else{
                        user.setMessage_ids(messageIds.toArray(new Long[0]));
                    }
                    userRepository.save(user);
                }

            }
        }

    }*/
}
