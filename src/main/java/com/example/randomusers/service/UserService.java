package com.example.randomusers.service;

import com.example.randomusers.model.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class UserService {
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    public UserService() {
        this.webClient = WebClient.create("https://randomuser.me/api");
        this.objectMapper = new ObjectMapper();
    }
    
    public Flux<User> getRandomUsers(int count) {
        return webClient.get()
                .uri("/?results=" + count)
                .retrieve()
                .bodyToMono(String.class)
                .flatMapMany(response -> {
                    try {
                        JsonNode root = objectMapper.readTree(response);
                        JsonNode results = root.get("results");
                        
                        return Flux.fromIterable(() -> results.iterator())
                                .map(userNode -> {
                                    User user = new User();
                                    user.setName(userNode.get("name").get("first").asText() + " " + 
                                               userNode.get("name").get("last").asText());
                                    user.setGender(userNode.get("gender").asText());
                                    user.setLocation(userNode.get("location").get("city").asText() + ", " + 
                                                   userNode.get("location").get("country").asText());
                                    user.setEmail(userNode.get("email").asText());
                                    user.setDateOfBirth(LocalDate.parse(
                                        userNode.get("dob").get("date").asText().substring(0, 10)));
                                    user.setPicture(userNode.get("picture").get("large").asText());
                                    return user;
                                });
                    } catch (Exception e) {
                        return Flux.error(e);
                    }
                });
    }
} 