package com.ccsw.tutorial_category;

import com.ccsw.tutorial_category.model.Category;
import com.ccsw.tutorial_category.model.CategoryDTO;

import java.util.List;

public interface CategoryService {
    Category get(Long id);

    List<Category> findAll();

    void save(Long id, CategoryDTO dto);

    void delete(Long id) throws Exception;
}
