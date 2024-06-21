package org.retaileasy.retaileasyserver.controllers;


import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.services.employee.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/emp")
public class AuthorizedController {
    private final EmployeeServices employeeServices;


    @Autowired
    public AuthorizedController(EmployeeServices employeeServices) {
        this.employeeServices = employeeServices;
    }

    @GetMapping("/most-recent-bill")
    public ResponseEntity<CommonResponseDto<List<BillDto>>> getRecentBill() {
        CommonResponseDto<List<BillDto>> response = employeeServices.get10LastBills();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
