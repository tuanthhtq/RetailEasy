package org.retaileasy.retaileasyserver.services.anonymous;

import org.retaileasy.retaileasyserver.dtos.BillInfoDto;
import org.retaileasy.retaileasyserver.dtos.BillItemDto;
import org.retaileasy.retaileasyserver.dtos.FeedbackResponse;
import org.retaileasy.retaileasyserver.dtos.ProductDetailDto;
import org.retaileasy.retaileasyserver.models.Feedback;
import org.retaileasy.retaileasyserver.models.StoreInformation;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AnonymousServices {

	StoreInformation getStoreInfo();

	ProductDetailDto getProductByBarCode(String barcode);
	ProductDetailDto getProductById(int productId);
	Page<BillInfoDto> getBillsListByPhone(String phoneNumber, int page );
	List<BillItemDto> getBillItemsByBillId(int billId);

	FeedbackResponse createFeedback(Feedback data);


}
