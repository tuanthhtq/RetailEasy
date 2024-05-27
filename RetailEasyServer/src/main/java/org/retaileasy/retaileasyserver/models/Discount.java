package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "discounts")
public class Discount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "discount_id", nullable = false)
	private Integer id;

	@Column(name = "discount", precision = 10)
	private BigDecimal discount;

	@Column(name = "start_date")
	private Instant startDate;

	@Column(name = "end_date")
	private Instant endDate;

	@OneToMany(mappedBy = "discount")
	private Set<Product> products = new LinkedHashSet<>();

}