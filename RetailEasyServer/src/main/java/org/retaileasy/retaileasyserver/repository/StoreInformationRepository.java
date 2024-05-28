package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.StoreInformation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreInformationRepository extends JpaRepository<StoreInformation, Integer> {
}
