package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "status")
public class Status {
	@Id
	@Column(name = "status_id", nullable = false)
	private Integer id;

	@Column(name = "status_value", nullable = false)
	private Integer statusValue;

}