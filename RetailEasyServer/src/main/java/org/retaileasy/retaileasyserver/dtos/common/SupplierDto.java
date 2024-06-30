package org.retaileasy.retaileasyserver.dtos.common;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link org.retaileasy.retaileasyserver.models.Supplier}
 */
public record SupplierDto(@NotNull @Size(max = 150) String name,
                          @NotNull @Size(max = 15) String phoneNumber) implements Serializable {
}