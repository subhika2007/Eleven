package com.elegantsilks.store.controller;

import com.elegantsilks.store.dto.ProductDto;
import com.elegantsilks.store.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductDto> all() {
        return service.findAll();
    }

    @GetMapping("/search")
    public List<ProductDto> search(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return service.search(keyword);
    }

    @GetMapping("/category/{category}")
    public List<ProductDto> byCategory(@PathVariable String category) {
        return service.findByCategory(category);
    }

    @GetMapping("/{id}")
    public ProductDto one(@PathVariable Long id) {
        return service.findById(id);
    }
}
