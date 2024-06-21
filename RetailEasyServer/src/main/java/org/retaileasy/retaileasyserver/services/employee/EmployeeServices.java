package org.retaileasy.retaileasyserver.services.employee;

import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;

import java.util.List;

public interface EmployeeServices {

    CommonResponseDto<List<BillDto>> get10LastBills();

}
