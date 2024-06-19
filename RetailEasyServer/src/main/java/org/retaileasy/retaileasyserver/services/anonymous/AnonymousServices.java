package org.retaileasy.retaileasyserver.services.anonymous;

import org.retaileasy.retaileasyserver.dtos.*;
import org.retaileasy.retaileasyserver.dtos.anonymous.FeedbackDto;
import org.retaileasy.retaileasyserver.dtos.common.ProductDetailDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDetailDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.models.StoreInformation;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface AnonymousServices {

	CommonResponseDto<StoreInformation> getStoreInfo();

	CommonResponseDto<List<BillDto>> getBillListByPhone(String phone);
	CommonResponseDto<BillDetailDto> getBillDetailById(int billId);

	CommonResponseDto<ProductDetailDto> getProductDetailByBarCode(String barcode);

	CommonResponseDto<FeedbackDto> createFeedback(FeedbackDto data, BindingResult bindingResult);


}
