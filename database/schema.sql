-- Elegant Silks & Sarees - MySQL schema
-- Optional: the Spring Boot app creates these tables automatically (ddl-auto=update).
-- Run this file only if you prefer to create the database manually:
--   mysql -u root -p < database/schema.sql
--   mysql -u root -p elegant_silks < database/data.sql

CREATE DATABASE IF NOT EXISTS elegant_silks CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE elegant_silks;

CREATE TABLE IF NOT EXISTS categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  slug VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  short_description VARCHAR(255) NOT NULL,
  full_description VARCHAR(2000) NOT NULL,
  category_id BIGINT NOT NULL,
  audience VARCHAR(20) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) NULL,
  discount_percent INT NULL,
  pack_info VARCHAR(40) NULL,
  sizes VARCHAR(255) NULL,
  colours VARCHAR(255) NULL,
  image_path VARCHAR(255) NOT NULL,
  in_stock BIT NOT NULL DEFAULT 1,
  featured BIT NOT NULL DEFAULT 0,
  new_arrival BIT NOT NULL DEFAULT 0,
  confirmation_note VARCHAR(500) NULL,
  created_at DATETIME(6) NOT NULL,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address VARCHAR(500) NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'NEW',
  created_at DATETIME(6) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(30) NULL,
  colour VARCHAR(60) NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  line_total DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(id)
);
