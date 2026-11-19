package com.elegantsilks.store.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record OrderItemRequest(
        @NotNull(message = "productId is required") Long productId,
        @Min(value = 1, message = "quantity must be at least 1")
        @Max(value = 50, message = "quantity cannot exceed 50") int quantity,
        @Size(max = 30) String size,
        @Size(max = 60) String colour) {
}
