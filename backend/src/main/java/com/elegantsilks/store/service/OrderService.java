package com.elegantsilks.store.service;

import com.elegantsilks.store.dto.*;
import com.elegantsilks.store.entity.CustomerOrder;
import com.elegantsilks.store.entity.OrderItem;
import com.elegantsilks.store.entity.Product;
import com.elegantsilks.store.exception.ResourceNotFoundException;
import com.elegantsilks.store.repository.OrderRepository;
import com.elegantsilks.store.repository.ProductRepository;
import java.math.BigDecimal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
    private final OrderRepository orders;
    private final ProductRepository products;

    public OrderService(OrderRepository orders, ProductRepository products) {
        this.orders = orders;
        this.products = products;
    }

    /** Prices are always taken from the database, never from the client. */
    @Transactional
    public OrderResponse create(OrderRequest request) {
        CustomerOrder order = new CustomerOrder();
        order.setCustomerName(request.customerName().trim());
        order.setCustomerPhone(request.customerPhone().trim());
        order.setDeliveryAddress(request.deliveryAddress() == null ? null : request.deliveryAddress().trim());

        BigDecimal total = BigDecimal.ZERO;
        for (OrderItemRequest line : request.items()) {
            Product product = products.findById(line.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + line.productId()));
            if (!product.isInStock()) {
                throw new IllegalArgumentException(product.getName() + " is currently out of stock");
            }
            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(line.quantity());
            item.setSize(blankToNull(line.size()));
            item.setColour(blankToNull(line.colour()));
            item.setUnitPrice(product.getPrice());
            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(line.quantity()));
            item.setLineTotal(lineTotal);
            order.addItem(item);
            total = total.add(lineTotal);
        }
        order.setTotalAmount(total);
        return toResponse(orders.save(order));
    }

    @Transactional(readOnly = true)
    public OrderResponse findById(Long id) {
        return orders.findById(id).map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
    }

    private OrderResponse toResponse(CustomerOrder o) {
        return new OrderResponse(o.getId(), o.getCustomerName(), o.getCustomerPhone(), o.getDeliveryAddress(),
                o.getTotalAmount(), o.getStatus(), o.getCreatedAt(),
                o.getItems().stream().map(i -> new OrderItemResponse(
                        i.getProduct().getId(), i.getProduct().getCode(), i.getProduct().getName(),
                        i.getProduct().getImagePath(), i.getQuantity(), i.getSize(), i.getColour(),
                        i.getUnitPrice(), i.getLineTotal())).toList());
    }

    private static String blankToNull(String s) {
        return s == null || s.isBlank() ? null : s.trim();
    }
}
