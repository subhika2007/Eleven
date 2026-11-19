package com.elegantsilks.store.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long productId, String productCode, String productName, String imagePath,
        int quantity, String size, String colour, BigDecimal unitPrice, BigDecimal lineTotal) {
}
