package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}