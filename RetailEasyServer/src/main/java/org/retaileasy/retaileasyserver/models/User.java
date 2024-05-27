package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id", nullable = false)
	private Integer id;

	@Column(name = "username", nullable = false, length = 30)
	private String username;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "full_name", length = 100)
	private String fullName;

	@Column(name = "phone_number", length = 15)
	private String phoneNumber;

	@Column(name = "address", length = 150)
	private String address;

	@Column(name = "email", length = 150)
	private String email;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "status_id")
	private Status status;

	@Column(name = "created_date")
	private Instant createdDate;

	@Column(name = "modified_date")
	private Instant modifiedDate;

}