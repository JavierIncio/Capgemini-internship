package com.ccsw.tutorial_game.game;

import com.ccsw.tutorial_game.game.model.Game;
import com.ccsw.tutorial_game.game.model.GameDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Game", description = "API of Game")
@RequestMapping(value = "/game")
@RestController
@CrossOrigin(origins = "*")
public class GameController {
    private final GameService gameService;
    private final ModelMapper mapper;

    @Autowired
    public GameController(GameService gameService, ModelMapper mapper) {
        this.gameService = gameService;
        this.mapper = mapper;
    }

    @Operation(summary = "Find", description = "Method that return a filtered list of Games")
    @GetMapping
    public List<GameDTO> find(@RequestParam(value = "title", required = false) String title, @RequestParam(value = "idCategory", required = false) Long idCategory) {

        List<Game> game = this.gameService.find(title, idCategory);

        return game.stream().map(e -> mapper.map(e, GameDTO.class)).collect(Collectors.toList());
    }

    @Operation(summary = "Save or Update", description = "Method that saves or updates a Game")
    @PutMapping(path = { "", "/{id}" })
    public void save(@PathVariable(name = "id", required = false) Long id, @RequestBody GameDTO dto) {

        gameService.save(id, dto);
    }
}
