package com.elegantsilks.store.service;

import com.elegantsilks.store.dto.ProductDto;
import com.elegantsilks.store.exception.ResourceNotFoundException;
import com.elegantsilks.store.repository.ProductRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ProductService {
    private final ProductRepository products;

    public ProductService(ProductRepository products) {
        this.products = products;
    }

    public List<ProductDto> findAll() {
        return products.findAllByOrderByIdAsc().stream().map(ProductDto::from).toList();
    }

    public ProductDto findById(Long id) {
        return products.findById(id).map(ProductDto::from)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
    }

    public List<ProductDto> search(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return findAll();
        }
        return products.search(keyword.trim()).stream().map(ProductDto::from).toList();
    }

    public List<ProductDto> findByCategory(String category) {
        return products.findByCategory(category.trim()).stream().map(ProductDto::from).toList();
    }
}
