package org.retaileasy.retaileasyserver.repository;

import org.retaileasy.retaileasyserver.models.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Integer> {
	Page<Bill> findByCustomerPhone(String customerPhone, Pageable pageable);

}