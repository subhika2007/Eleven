package com.elegantsilks.store.repository;

import com.elegantsilks.store.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
           select p from Product p
           where lower(p.name) like lower(concat('%', :keyword, '%'))
              or lower(p.category.name) like lower(concat('%', :keyword, '%'))
              or lower(p.shortDescription) like lower(concat('%', :keyword, '%'))
           order by p.id
           """)
    List<Product> search(@Param("keyword") String keyword);

    @Query("""
           select p from Product p
           where lower(p.category.slug) = lower(:category)
              or lower(p.category.name) = lower(:category)
           order by p.id
           """)
    List<Product> findByCategory(@Param("category") String category);

    List<Product> findAllByOrderByIdAsc();
}
