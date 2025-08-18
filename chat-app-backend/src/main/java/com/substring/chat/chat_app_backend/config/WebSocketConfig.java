package com.substring.chat.chat_app_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker  //Msg ko server pe route krti hai
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");

        //server-side: @MessagingMappinf("/chat")
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //jisko client actuallly subscribe krega

        registry.addEndpoint("/chat")    //.....yeh url hai connection ke liye
                .setAllowedOrigins("http://localhost:5173")
                .withSockJS();
    }

    //ab isse chat ke endpoint pr connection establish hoga
}
