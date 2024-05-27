package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "supliers")
public class Suplier {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "suplier_id", nullable = false)
	private Integer id;

	@Column(name = "name", nullable = false, length = 150)
	private String name;

	@Column(name = "email", length = 150)
	private String email;

	@Column(name = "address", length = 150)
	private String address;

	@Column(name = "phone_number", nullable = false, length = 15)
	private String phoneNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "status_id")
	private Status status;

}