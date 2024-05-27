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
@Table(name = "bills")
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "bill_id", nullable = false)
	private Integer id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "creator_id", referencedColumnName = "user_id")
	private User creator;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "store_id")
	private StoreInformation store;

	@Column(name = "customer_name", nullable = false, length = 100)
	private String customerName;

	@Column(name = "customer_phone", nullable = false, length = 15)
	private String customerPhone;

	@Column(name = "created_date")
	private Instant createdDate;

	@OneToMany(mappedBy = "bill")
	private Set<BillItem> billItems = new LinkedHashSet<>();

}