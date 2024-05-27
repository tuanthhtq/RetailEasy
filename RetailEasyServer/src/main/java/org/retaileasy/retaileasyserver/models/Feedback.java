package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "feedbacks")
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "feedback_id", nullable = false)
	private Integer id;

	@Column(name = "sender_name", nullable = false, length = 100)
	private String senderName;

	@Column(name = "sender_email", length = 150)
	private String senderEmail;

	@Column(name = "sender_phone", nullable = false, length = 15)
	private String senderPhone;

	@Column(name = "title", nullable = false, length = 100)
	private String title;

	@Column(name = "content", length = 200)
	private String content;

	@Column(name = "created_date")
	private Instant createdDate;

}