package com.substring.chat.chat_app_backend.repositories;

import com.substring.chat.chat_app_backend.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, String> {

    Room findByRoomId(String roomId);
}
