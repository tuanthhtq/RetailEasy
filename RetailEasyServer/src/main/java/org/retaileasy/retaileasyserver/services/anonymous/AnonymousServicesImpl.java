package org.retaileasy.retaileasyserver.services.anonymous;

import org.retaileasy.retaileasyserver.dtos.*;
import org.retaileasy.retaileasyserver.dtos.anonymous.FeedbackDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDetailDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.dtos.common.ProductDetailDto;
import org.retaileasy.retaileasyserver.models.Bill;
import org.retaileasy.retaileasyserver.models.Feedback;
import org.retaileasy.retaileasyserver.models.Product;
import org.retaileasy.retaileasyserver.models.StoreInformation;
import org.retaileasy.retaileasyserver.repository.BillRepository;
import org.retaileasy.retaileasyserver.repository.FeedbackRepository;
import org.retaileasy.retaileasyserver.repository.ProductRepository;
import org.retaileasy.retaileasyserver.repository.StoreInformationRepository;
import org.retaileasy.retaileasyserver.utils.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnonymousServicesImpl implements AnonymousServices{

	private final ProductRepository productRepository;
	private final FeedbackRepository feedbackRepository;
	private final BillRepository billRepository;
	private final StoreInformationRepository storeInformationRepository;

	@Autowired
	public AnonymousServicesImpl(
            ProductRepository pr,
            FeedbackRepository fr,
            BillRepository br,
			StoreInformationRepository sir
    ){
		this.feedbackRepository = fr;
		this.billRepository = br;
		this.productRepository = pr;
        this.storeInformationRepository = sir;
    }


	@Override
	public CommonResponseDto<StoreInformation> getStoreInfo() {
		CommonResponseDto<StoreInformation> response = new CommonResponseDto<>();
		Map<String, String> errors = new HashMap<>();

		response.setStatus(400);
		response.setMessage("Đã có lỗi sảy ra, vui lòng thử lại sau");

		StoreInformation store = storeInformationRepository.findById(1).orElse(null);
		if(store == null) {
			response.setError(errors);
			return response;
		}
		response.setStatus(200);
		response.setMessage("Success");
		response.setData(store);
		return response;
	}

	@Override
	public CommonResponseDto<ProductDetailDto> getProductDetailByBarCode(String barcode) {
		CommonResponseDto<ProductDetailDto> response = new CommonResponseDto<>();
		Map<String, String> errors = new HashMap<>();

		response.setStatus(400);
			response.setMessage("Mã lỗi hoặc sản phẩm không tồn tại");

		Product product = productRepository.findByBarcodes_Code(barcode).orElse(null);
		if(product == null){
			errors.put("scanBarcode", "Không tìm thấy sản phẩm");
			response.setError(errors);
			return response;
		}

		response.setMessage("Success");
		response.setStatus(200);
		response.setData(DtoMapper.toProductDetailDto(product, barcode));
		return response;
	}

	@Override
	public CommonResponseDto<List<BillDto>> getBillListByPhone(String phoneNumber ) {
		List<Bill> list = billRepository.findByCustomerPhone(phoneNumber);
		CommonResponseDto<List<BillDto>> response = new CommonResponseDto<>();

		response.setStatus(200);
		response.setMessage("Success");
		response.setData(list.stream().map(DtoMapper::toBillInfoDto).collect(Collectors.toList()));

		return response;
	}

	@Override
	public CommonResponseDto<BillDetailDto> getBillDetailById(int billId) {
		Map<String, String> errors = new HashMap<>();
		CommonResponseDto<BillDetailDto> response = new CommonResponseDto<>();
		response.setStatus(400);
		response.setMessage("Đơn hàng không tồn tại");

		Bill bill = billRepository.findById(billId).orElse(null);
		if(bill == null) {
			errors.put("billDetail", "Không tìm thấy thông tin đơn hàng");
			response.setError(errors);
        }else{
			response.setStatus(200);
			response.setData(DtoMapper.toBillDetailDto(bill));
			response.setMessage("Success");
        }
        return response;
    }

	@Override
	public CommonResponseDto<FeedbackDto> createFeedback(FeedbackDto data, BindingResult bindingResult) {
		CommonResponseDto<FeedbackDto> response = new CommonResponseDto<>();
		response.setStatus(400);
		response.setMessage("Gửi phản hồi thất bại");

		Map<String, String> errors = new HashMap<>();
		//fields errors
		if (bindingResult.hasErrors()) {
			for (FieldError error : bindingResult.getFieldErrors()) {
				errors.put(error.getField(), error.getDefaultMessage());
			}
			response.setError(errors);
			return response;
		}

		try {
			response.setData(data);
			response.setStatus(201);
			response.setMessage("Gửi phản hồi thành công");

			Feedback feedback = new Feedback(
					data.getName(),
					data.getPhone(),
					data.getTitle(),
					data.getMessage()
			);
			feedbackRepository.saveAndFlush(feedback);
			return response;
		}catch (Exception e){
			errors.put("feedback", e.getLocalizedMessage());
			return response;
		}

	}

}
