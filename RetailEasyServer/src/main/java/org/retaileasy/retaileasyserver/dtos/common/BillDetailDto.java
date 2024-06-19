package org.retaileasy.retaileasyserver.dtos.common;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

/**
 * DTO for {@link org.retaileasy.retaileasyserver.models.Bill}
 */
public record BillDetailDto(
        Integer billId,
        Integer total,
        String seller,
        String storeName,
        Instant createdDate,
        List<BillItemDto> billItems,
        @NotNull boolean status
) implements Serializable {}
