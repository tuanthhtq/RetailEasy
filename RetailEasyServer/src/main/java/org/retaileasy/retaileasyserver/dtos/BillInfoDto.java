package org.retaileasy.retaileasyserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * @author tuan
 */

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BillInfoDto {
	private int billId;
	private String creator;
	private int total;
	private Instant createdDate;
}
