package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id", nullable = false)
	private Integer id;

	@Column(name = "product_name", nullable = false, length = 150)
	private String productName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "supplier_id")
	private Supplier supplier;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "brand_id")
	private Brand brand;

	@Column(name = "manufactured_date")
	private Instant manufacturedDate;

	@Column(name = "expiry")
	private Instant expiry;

	@Column(name = "stock")
	private Integer stock;

	@Column(name = "price")
	private Integer price;

	@Column(name = "import_price", nullable = false)
	private Integer importPrice;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "discount_id")
	private Discount discount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "status_id")
	private Status status;

	@Column(name = "modified_date")
	private Instant modifiedDate;

	@OneToMany(mappedBy = "product")
	private Set<Barcode> barcodes = new LinkedHashSet<>();

	@OneToMany(mappedBy = "product")
	private Set<BillItem> billItems = new LinkedHashSet<>();

	@OneToMany(mappedBy = "product")
	private Set<DataEntryLog> dataEntryLogs = new LinkedHashSet<>();

	@OneToMany(mappedBy = "product")
	private Set<ProductImage> productImages = new LinkedHashSet<>();

}
