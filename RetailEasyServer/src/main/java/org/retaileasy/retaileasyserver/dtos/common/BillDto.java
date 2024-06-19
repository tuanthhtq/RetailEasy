package org.retaileasy.retaileasyserver.dtos.common;

import java.io.Serializable;
import java.time.Instant;

public record BillDto(
     int billId,
     boolean status,
     int total,
     Instant createdDate
) implements Serializable {}
