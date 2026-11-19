package com.elegantsilks.store.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Public product code shown to customers, e.g. ES-001 */
    @Column(nullable = false, unique = true, length = 20)
    private String code;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "short_description", nullable = false, length = 255)
    private String shortDescription;

    @Column(name = "full_description", nullable = false, length = 2000)
    private String fullDescription;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "category_id")
    private Category category;

    /** WOMEN, MEN, KIDS or UNISEX */
    @Column(nullable = false, length = 20)
    private String audience;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "pack_info", length = 40)
    private String packInfo;

    /** Comma separated, empty when the shop has not supplied sizes */
    @Column(length = 255)
    private String sizes;

    /** Comma separated colours */
    @Column(length = 255)
    private String colours;

    @Column(name = "image_path", nullable = false, length = 255)
    private String imagePath;

    @Column(name = "in_stock", nullable = false)
    private boolean inStock = true;

    @Column(nullable = false)
    private boolean featured;

    @Column(name = "new_arrival", nullable = false)
    private boolean newArrival;

    /** Facts that were not on the supplied flyer and must be confirmed by the shop */
    @Column(name = "confirmation_note", length = 500)
    private String confirmationNote;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String s) { this.shortDescription = s; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String s) { this.fullDescription = s; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public String getAudience() { return audience; }
    public void setAudience(String audience) { this.audience = audience; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal p) { this.originalPrice = p; }
    public Integer getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Integer d) { this.discountPercent = d; }
    public String getPackInfo() { return packInfo; }
    public void setPackInfo(String packInfo) { this.packInfo = packInfo; }
    public String getSizes() { return sizes; }
    public void setSizes(String sizes) { this.sizes = sizes; }
    public String getColours() { return colours; }
    public void setColours(String colours) { this.colours = colours; }
    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public boolean isNewArrival() { return newArrival; }
    public void setNewArrival(boolean newArrival) { this.newArrival = newArrival; }
    public String getConfirmationNote() { return confirmationNote; }
    public void setConfirmationNote(String n) { this.confirmationNote = n; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
