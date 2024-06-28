package org.retaileasy.retaileasyserver.dtos.common;

import java.io.Serializable;

public record ImportItemsDto (
        String productName,
        String productImage,
        int quantity,
        int categoryId,
        int brandId,
        String manufacturedDate,
        String expiry,
        String isReturned,
        int price
) implements Serializable{}
