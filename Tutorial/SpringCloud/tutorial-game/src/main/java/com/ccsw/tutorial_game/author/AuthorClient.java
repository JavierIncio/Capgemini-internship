package com.ccsw.tutorial_game.author;

import com.ccsw.tutorial_game.author.model.AuthorDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(value = "SPRING-CLOUD-EUREKA-CLIENT-AUTHOR", url = "http://localhost:8080")
public interface AuthorClient {
    @GetMapping(value = "/author")
    List<AuthorDTO> findAll();
}
