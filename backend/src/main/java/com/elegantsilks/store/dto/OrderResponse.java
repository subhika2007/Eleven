package com.elegantsilks.store.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id, String customerName, String customerPhone, String deliveryAddress,
        BigDecimal totalAmount, String status, LocalDateTime createdAt, List<OrderItemResponse> items) {
}
