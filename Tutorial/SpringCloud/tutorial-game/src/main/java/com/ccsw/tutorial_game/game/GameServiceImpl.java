package com.ccsw.tutorial_game.game;

import com.ccsw.tutorial_game.common.criteria.SearchCriteria;
import com.ccsw.tutorial_game.game.model.Game;
import com.ccsw.tutorial_game.game.model.GameDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class GameServiceImpl implements GameService {
    private final GameRepository gameRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public List<Game> find(String title, Long idCategory) {
        GameSpecification titleSpec = new GameSpecification(new SearchCriteria("title", ":", title));
        GameSpecification categorySpec = new GameSpecification(new SearchCriteria("idCategory", ":", idCategory));

        Specification<Game> spec = titleSpec.and(categorySpec);

        return this.gameRepository.findAll(spec);
    }

    @Override
    public void save(Long id, GameDTO dto) {
        Game game;

        if (id == null) {
            game = new Game();
        } else {
            game = this.gameRepository.findById(id).orElse(null);
        }

        BeanUtils.copyProperties(dto, game, "id");

        game.setIdAuthor(dto.getIdAuthor());
        game.setIdCategory(dto.getIdCategory());

        this.gameRepository.save(game);
    }
}
