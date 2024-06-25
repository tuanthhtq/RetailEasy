package org.retaileasy.retaileasyserver.services.employee;

import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.models.Bill;
import org.retaileasy.retaileasyserver.repository.BillRepository;
import org.retaileasy.retaileasyserver.utils.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServicesImpl implements EmployeeServices{
    private final BillRepository billRepository;

    @Autowired
    public EmployeeServicesImpl(BillRepository billRepository) {
        this.billRepository = billRepository;
    }


    @Override
    public CommonResponseDto<List<BillDto>> get10LastBills() {
        List<Bill> list = billRepository.find10LastBills();
        CommonResponseDto<List<BillDto>> response = new CommonResponseDto<>();

        response.setStatus(200);
        response.setMessage("Success");
        response.setData(list.stream().map(DtoMapper::toBillInfoDto).collect(Collectors.toList()));

        return response;
    }
}
