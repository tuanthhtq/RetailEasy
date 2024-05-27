package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}