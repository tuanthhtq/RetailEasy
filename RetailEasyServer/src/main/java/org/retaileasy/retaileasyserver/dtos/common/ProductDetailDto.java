package org.retaileasy.retaileasyserver.dtos.common;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link org.retaileasy.retaileasyserver.models.Product}
 */
public record ProductDetailDto(
        String barcode,
        String productName,
        String productImage,
        String category,
        String brand,
        Instant manufacturedDate,
        Instant expiry,
        Integer stock,
        Integer price,
        boolean status
) implements Serializable {}
