package org.retaileasy.retaileasyserver.services.employee;

import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.dtos.common.ImportDto;
import org.retaileasy.retaileasyserver.dtos.common.ImportItemsDto;

import java.util.List;

public interface EmployeeServices {

    CommonResponseDto<List<BillDto>> get10LastBills();

    CommonResponseDto<ImportDto> importGoods(List<ImportItemsDto> items);

//    CommonResponseDto<String> createBill()

}
