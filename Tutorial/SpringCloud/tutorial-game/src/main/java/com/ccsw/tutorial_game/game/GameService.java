package com.ccsw.tutorial_game.game;

import com.ccsw.tutorial_game.game.model.Game;
import com.ccsw.tutorial_game.game.model.GameDTO;

import java.util.List;

public interface GameService {
    List<Game> find(String title, Long idCategory);

    void save(Long id, GameDTO dto);
}
