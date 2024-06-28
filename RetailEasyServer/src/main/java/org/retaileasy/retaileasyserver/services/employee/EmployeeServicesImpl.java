package org.retaileasy.retaileasyserver.services.employee;

import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.dtos.common.ImportDto;
import org.retaileasy.retaileasyserver.dtos.common.ImportItemsDto;
import org.retaileasy.retaileasyserver.models.Bill;
import org.retaileasy.retaileasyserver.models.Import;
import org.retaileasy.retaileasyserver.models.ImportRepository;
import org.retaileasy.retaileasyserver.models.User;
import org.retaileasy.retaileasyserver.repository.BillRepository;
import org.retaileasy.retaileasyserver.repository.UserRepository;
import org.retaileasy.retaileasyserver.utils.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmployeeServicesImpl implements EmployeeServices{
    private final BillRepository billRepository;
    private final UserRepository userRepository;
    private final ImportRepository importRepository;

    @Autowired
    public EmployeeServicesImpl(BillRepository billRepository, UserRepository userRepository,
                                ImportRepository importRepository) {
        this.billRepository = billRepository;
        this.userRepository = userRepository;
        this.importRepository = importRepository;
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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public CommonResponseDto<ImportDto> importGoods(List<ImportItemsDto> items, int supplierId) {
        CommonResponseDto<ImportDto> response = new CommonResponseDto<>();
        response.setStatus(400);
        response.setMessage("Nhập hàng thất bại");

        Map<String, String> errors = new HashMap<>();

        try{
            //get user from context holder
            Authentication contextHolder = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) contextHolder.getPrincipal();
            String creatorPhone = userDetails.getUsername();

            //get creator
            User creator = userRepository.findByPhoneNumber(creatorPhone).orElse(null);
            if(creator == null){
                errors.put("Creator", "Thông tin nhân viên không hợp lệ");
            }else{
                Import obj = new Import();
                obj.setCreator(creator);
                //calculate money in and money out
                int moneyIn = 0;
                int moneyOut = 0;
                for (ImportItemsDto item: items) {
                    if(item.isReturned()){
                        moneyIn += item.price() * item.quantity();
                    }else {
                        moneyOut += item.price() * item.quantity();
                    }
                }
                obj.setReturnPrice(moneyIn);
                obj.setImportPrice(moneyOut);

                importRepository.saveAndFlush(obj);
            }

        }catch (Exception e){
            response.setError(errors);
            return response;
        }



        return response;
    }
}
