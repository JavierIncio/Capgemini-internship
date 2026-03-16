package com.ccsw.tutorial_author.author;

import com.ccsw.tutorial_author.author.model.Author;
import com.ccsw.tutorial_author.author.model.AuthorDTO;
import com.ccsw.tutorial_author.author.model.AuthorSearchDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;

    @Autowired
    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public Author get(Long id) {
        return this.authorRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Author> findPage(AuthorSearchDTO dto) {
        return this.authorRepository.findAll(dto.getPageable().getPageable());
    }

    @Override
    public void save(Long id, AuthorDTO dto) {
        Author author;

        if (id == null)
            author = new Author();
        else
            author = this.get(id);

        BeanUtils.copyProperties(dto, author, "id");

        this.authorRepository.save(author);
    }

    @Override
    public void delete(Long id) throws Exception {
        if (this.get(id) == null)
            throw new Exception("Not exists");

        this.authorRepository.deleteById(id);
    }

    @Override
    public List<Author> findAll() {
        return (List<Author>) this.authorRepository.findAll();
    }
}
