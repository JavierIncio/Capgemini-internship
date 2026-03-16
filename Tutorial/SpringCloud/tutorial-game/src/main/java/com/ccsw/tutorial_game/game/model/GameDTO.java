package com.ccsw.tutorial_game.game.model;

import lombok.Data;

@Data
public class GameDTO {
    private Long id;

    private String title;

    private String age;

    private Long idCategory;

    private Long idAuthor;
}
