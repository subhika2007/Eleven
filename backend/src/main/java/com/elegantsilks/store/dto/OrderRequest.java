package com.elegantsilks.store.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public record OrderRequest(
        @NotBlank(message = "Customer name is required") @Size(max = 120) String customerName,
        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "^[+]?[0-9 -]{10,15}$", message = "Enter a valid phone number") String customerPhone,
        @Size(max = 500, message = "Address is too long") String deliveryAddress,
        @NotEmpty(message = "Order must contain at least one item") List<@Valid OrderItemRequest> items) {
}
