package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    UserRole findByRole_RoleName(String roleName);
}
