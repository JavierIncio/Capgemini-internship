package com.ccsw.tutorial_author.author;

import com.ccsw.tutorial_author.author.model.Author;
import com.ccsw.tutorial_author.author.model.AuthorDTO;
import com.ccsw.tutorial_author.author.model.AuthorSearchDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AuthorService {
    Author get(Long id);

    Page<Author> findPage(AuthorSearchDTO dto);

    void save(Long id, AuthorDTO dto);

    void delete(Long id) throws Exception;

    List<Author> findAll();
}
