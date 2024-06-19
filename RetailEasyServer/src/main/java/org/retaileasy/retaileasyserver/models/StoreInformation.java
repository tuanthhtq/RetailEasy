package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "store_information")
public class StoreInformation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "store_id", nullable = false)
	private Integer id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "address", nullable = false, length = 150)
	private String address;

	@Column(name = "phone_number", nullable = false, length = 15)
	private String phoneNumber;

	@Column(name = "email", length = 150)
	private String email;

    @Size(max = 100)
    @NotNull
    @Column(name = "owner", nullable = false, length = 100)
    private String owner;

    @Size(max = 15)
    @Column(name = "phone_number_2", length = 15)
    private String phoneNumber2;

    public StoreInformation(String name, String owner, String address, String phoneNumber, String email) {
		this.name = name;
		this.address = address;
		this.owner = owner;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}

}
