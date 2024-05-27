package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}