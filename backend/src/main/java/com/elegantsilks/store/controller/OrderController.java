package com.elegantsilks.store.controller;

import com.elegantsilks.store.dto.OrderRequest;
import com.elegantsilks.store.dto.OrderResponse;
import com.elegantsilks.store.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse create(@Valid @RequestBody OrderRequest request) {
        return service.create(request);
    }

    @GetMapping("/{id}")
    public OrderResponse one(@PathVariable Long id) {
        return service.findById(id);
    }
}
