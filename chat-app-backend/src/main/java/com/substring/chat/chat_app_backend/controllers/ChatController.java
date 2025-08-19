package com.substring.chat.chat_app_backend.controllers;

import com.substring.chat.chat_app_backend.entities.Message;
import com.substring.chat.chat_app_backend.entities.Room;
import com.substring.chat.chat_app_backend.payload.MessageRequest;
import com.substring.chat.chat_app_backend.repositories.MessageRepository;
import com.substring.chat.chat_app_backend.repositories.RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private RoomRepository roomRepository;
    private final MessageRepository messageRepository;

    public ChatController(RoomRepository roomRepository, MessageRepository messageRepository) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }

    //msgs ko send aur receive krne ke liye apis

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    @Transactional

    public Message sendMessage(
            @DestinationVariable String roomId,
            @Payload MessageRequest request
    ) throws Exception {
        Room room = roomRepository.findByRoomId(request.getRoomId());

        if (room == null) {
            throw new RuntimeException("Room not found !!");
        }

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimestamp(LocalDateTime.now());
        message.setRoom(room);


        messageRepository.save(message);


        room.getMessages().add(message);
        roomRepository.save(room);

        return message;
    }
}
