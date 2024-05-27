package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "barcodes")
public class Barcode {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "barcode_id", nullable = false)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@Column(name = "code", length = 50)
	private String code;

	@Column(name = "created_date")
	private Instant createdDate;

}