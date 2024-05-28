package org.retaileasy.retaileasyserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

/**
 * @author tuan
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ProductDetailDto {
	private int productId;
	private String productName;
	private String category;
	private String supplier;
	private String brand;
	private Instant manufacturedDate;
	private Instant expiredDate;
	private int stock;
	private int price;
	private String status;
	private BigDecimal discount;
	private Instant discountStart;
	private Instant discountEnd;

}
