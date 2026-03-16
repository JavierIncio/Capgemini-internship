package com.ccsw.tutorial_author.author;

import com.ccsw.tutorial_author.author.model.Author;
import com.ccsw.tutorial_author.author.model.AuthorDTO;
import com.ccsw.tutorial_author.author.model.AuthorSearchDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Author", description = "API of Author")
@RequestMapping(value = "/author")
@RestController
@CrossOrigin(origins = "*")
public class AuthorController {
    private final AuthorService authorService;
    private final ModelMapper mapper;

    @Autowired
    public AuthorController(AuthorService authorService, ModelMapper mapper) {
        this.authorService = authorService;
        this.mapper = mapper;
    }

    @Operation(summary = "Find Page", description = "Method that return a page of Authors")
    @PostMapping
    public Page<AuthorDTO> findPage(@RequestBody AuthorSearchDTO dto) {

        Page<Author> page = this.authorService.findPage(dto);

        return new PageImpl<>(page.getContent().stream().map(e -> mapper.map(e, AuthorDTO.class)).collect(Collectors.toList()), page.getPageable(), page.getTotalElements());
    }

    @Operation(summary = "Save or Update", description = "Method that saves or updates a Author")
    @RequestMapping(path = { "", "/{id}" }, method = RequestMethod.PUT)
    public void save(@PathVariable(name = "id", required = false) Long id, @RequestBody AuthorDTO dto) {

        this.authorService.save(id, dto);
    }

    @Operation(summary = "Delete", description = "Method that deletes a Author")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) throws Exception {

        this.authorService.delete(id);
    }

    /**
     * Recupera un listado de autores {@link Author}
     *
     * @return {@link List} de {@link AuthorDTO}
     */
    @Operation(summary = "Find", description = "Method that return a list of Authors")
    @GetMapping
    public List<AuthorDTO> findAll() {

        List<Author> authors = this.authorService.findAll();

        return authors.stream().map(e -> mapper.map(e, AuthorDTO.class)).collect(Collectors.toList());
    }
}
