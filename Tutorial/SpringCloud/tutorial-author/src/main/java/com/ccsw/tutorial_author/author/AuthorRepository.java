package com.ccsw.tutorial_author.author;

import com.ccsw.tutorial_author.author.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Author, Long> {
    Page<Author> findAll(Pageable pageable);
}
