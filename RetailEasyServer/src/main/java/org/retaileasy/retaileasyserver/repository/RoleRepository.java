package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByRoleName(String roleName);

}
