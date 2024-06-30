package org.retaileasy.retaileasyserver.dtos.common;

import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link org.retaileasy.retaileasyserver.models.Import}
 */
public record ImportDto(
        String creatorFullName,
        @NotNull
        Integer importPrice,
        @NotNull
        Integer returnPrice,
        Instant createdDate,
        @NotNull(message = "Nhà cung cấp không được để trống")
        SupplierDto supplier,
        @NotNull Integer returnAmount

) implements Serializable {
}