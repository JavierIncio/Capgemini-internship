package com.ccsw.tutorial_game.game;

import com.ccsw.tutorial_game.game.model.Game;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long>, JpaSpecificationExecutor<Game> {
}
