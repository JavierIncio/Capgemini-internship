package com.ccsw.tutorial_author.author.model;

import com.ccsw.tutorial_author.common.pagination.PageableRequest;
import lombok.Data;

@Data
public class AuthorSearchDTO {
    private PageableRequest pageable;
}
