package com.ccsw.tutorial_category;

import com.ccsw.tutorial_category.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
