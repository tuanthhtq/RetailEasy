package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  @Query("select count(u) from User u")
  long countAll();

  Optional<User> findByUsernameOrPhoneNumber(String username, String phoneNumber);

  Optional<User> findByIdNumber(String idNumber);

  Optional<User> findByPhoneNumber(String phoneNumber);

  Optional<User> findByUsername(String username);
}
