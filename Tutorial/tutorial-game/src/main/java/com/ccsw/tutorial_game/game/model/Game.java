package com.ccsw.tutorial_game.game.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "age", nullable = false)
    private String age;

    @Column(name = "category_id", nullable = false)
    private Long idCategory;

    @Column(name = "author_id", nullable = false)
    private Long idAuthor;
}
