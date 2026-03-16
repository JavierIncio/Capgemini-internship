package com.ccsw.tutorial_category;

import com.ccsw.tutorial_category.model.Category;
import com.ccsw.tutorial_category.model.CategoryDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Category", description = "API of Category")
@RequestMapping(value = "/category")
@RestController
@CrossOrigin(origins = "*")
public class CategoryController {
    private final CategoryService categoryService;
    private final ModelMapper mapper;

    public CategoryController(CategoryService categoryService, ModelMapper mapper) {
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

    @Operation(summary = "Find", description = "Method that return a list of Categories")
    @GetMapping
    public List<CategoryDTO> findAll() {

        List<Category> categories = this.categoryService.findAll();

        return categories.stream().map(e -> mapper.map(e, CategoryDTO.class)).collect(Collectors.toList());
    }

    @Operation(summary = "Save or Update", description = "Method that saves or updates a Category")
    @PutMapping(path = { "", "/{id}" })
    public void save(@PathVariable(name = "id", required = false) Long id, @RequestBody CategoryDTO dto) {

        this.categoryService.save(id, dto);
    }

    @Operation(summary = "Delete", description = "Method that deletes a Category")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) throws Exception {

        this.categoryService.delete(id);
    }
}
