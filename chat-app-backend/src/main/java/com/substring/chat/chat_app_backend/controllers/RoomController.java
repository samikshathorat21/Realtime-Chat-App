package com.substring.chat.chat_app_backend.controllers;

import com.substring.chat.chat_app_backend.entities.Message;
import com.substring.chat.chat_app_backend.entities.Room;
import com.substring.chat.chat_app_backend.repositories.MessageRepository;
import com.substring.chat.chat_app_backend.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

    private RoomRepository roomRepository;
    private MessageRepository messageRepository;

    public RoomController(RoomRepository roomRepository , MessageRepository messageRepository) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }


    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {

        if(roomRepository.findByRoomId(roomId)!=null)
        {

            return ResponseEntity.badRequest().body("Room already exists !!");
        }


        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(
            @PathVariable String roomId
    ){
        Room room = roomRepository.findByRoomId(roomId);

        if(room==null){
            return ResponseEntity.badRequest()
                    .body("Room not found!!");
        }
        return ResponseEntity.ok(room);
    }


    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId,
            @RequestParam(value = "page" , defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20",required = false) int size
    ){
        Room room = roomRepository.findByRoomId(roomId);
        if(room==null){
            return ResponseEntity.badRequest().build();
        }

        //ab agr aisa nhi hai toh apn ko -msgs get krne ahi aur -pagination krna hai
        //Pagination ek technique hai data ko chhoti chhoti pages/chunks me divide karke bhejne ki,
        // taaki performance aur user experience dono better ho.

        List<Message> messages = room.getMessages();
        int start = Math.max(0 , messages.size() - (page+1) * size);
        int end = Math.min(messages.size() , start + size);
        List<Message> paginatedMessages = messages.subList(start, end);

        return ResponseEntity.ok(paginatedMessages);

    }


    @PostMapping("/{roomId}/messages")
    public ResponseEntity<Message> sendMessage(
            @PathVariable String roomId,
            @RequestBody Message message
    ) {
        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.badRequest().build();
        }

        message.setRoom(room);
        message.setTimestamp(LocalDateTime.now());

        Message savedMessage = messageRepository.save(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }


}
