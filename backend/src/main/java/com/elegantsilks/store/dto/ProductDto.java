package com.elegantsilks.store.dto;

import com.elegantsilks.store.entity.Product;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

public record ProductDto(
        Long id,
        String code,
        String name,
        String shortDescription,
        String fullDescription,
        CategoryDto category,
        String audience,
        BigDecimal price,
        BigDecimal originalPrice,
        Integer discountPercent,
        String packInfo,
        List<String> sizes,
        List<String> colours,
        String imagePath,
        boolean inStock,
        boolean featured,
        boolean newArrival,
        String confirmationNote,
        LocalDateTime createdAt) {

    public static ProductDto from(Product p) {
        return new ProductDto(
                p.getId(), p.getCode(), p.getName(), p.getShortDescription(), p.getFullDescription(),
                new CategoryDto(p.getCategory().getId(), p.getCategory().getName(), p.getCategory().getSlug()),
                p.getAudience(), p.getPrice(), p.getOriginalPrice(), p.getDiscountPercent(), p.getPackInfo(),
                split(p.getSizes()), split(p.getColours()), p.getImagePath(),
                p.isInStock(), p.isFeatured(), p.isNewArrival(), p.getConfirmationNote(), p.getCreatedAt());
    }

    private static List<String> split(String csv) {
        if (csv == null || csv.isBlank()) {
            return List.of();
        }
        return Arrays.stream(csv.split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();
    }
}
