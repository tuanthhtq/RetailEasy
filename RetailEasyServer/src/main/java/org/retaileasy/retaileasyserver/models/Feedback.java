package org.retaileasy.retaileasyserver.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "feedbacks")
@NoArgsConstructor
public class Feedback {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "feedback_id", nullable = false)
	private Integer id;

	@Column(name = "sender_name", nullable = false, length = 100)
	private String senderName;

	@Column(name = "sender_phone", nullable = false, length = 15)
	private String senderPhone;

	@Column(name = "title", nullable = false, length = 100)
	private String title;

	@Column(name = "content", length = 500)
	private String content;

	@Column(name = "created_date")
	@CreationTimestamp(source = SourceType.DB)
	private Instant createdDate;

	public Feedback(String senderName, String senderPhone, String title, String content) {
		this.senderName = senderName;
		this.senderPhone = senderPhone;
		this.title = title;
		this.content = content;
	}
}
