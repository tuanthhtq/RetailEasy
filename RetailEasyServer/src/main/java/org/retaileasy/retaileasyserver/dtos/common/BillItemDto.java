package org.retaileasy.retaileasyserver.dtos.common;

import java.io.Serializable;

/**
 * DTO for {@link org.retaileasy.retaileasyserver.models.BillItem}
 */
public record BillItemDto(
        String productProductName,
        String productProductImage,
        Integer quantity,
        Integer price
) implements Serializable {}
