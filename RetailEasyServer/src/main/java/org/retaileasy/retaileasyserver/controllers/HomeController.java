package org.retaileasy.retaileasyserver.controllers;

import jakarta.validation.Valid;
import org.retaileasy.retaileasyserver.dtos.CommonResponseDto;
import org.retaileasy.retaileasyserver.dtos.anonymous.FeedbackDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDetailDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.dtos.common.ProductDetailDto;
import org.retaileasy.retaileasyserver.models.StoreInformation;
import org.retaileasy.retaileasyserver.services.anonymous.AnonymousServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author tuan
 */

@RestController
@RequestMapping("api/v1/home")
public class HomeController {

	private final AnonymousServices anonymousServices;

	@Autowired
	public HomeController (
			AnonymousServices anonymousServices
    ){
        this.anonymousServices = anonymousServices;
	}

	@GetMapping("/landing")
	public ResponseEntity<CommonResponseDto<StoreInformation>> index() {
		return new ResponseEntity<>(anonymousServices.getStoreInfo(), HttpStatus.OK);
	}

	@GetMapping("/test")
	@PreAuthorize("hasRole('ROLE_DATA_ENTRY')")
	public ResponseEntity<String> test() {
		return new ResponseEntity<>("DQQWDWQDWQ", HttpStatus.OK);
	}

	@PostMapping("/send-feedback")
	public ResponseEntity<CommonResponseDto<FeedbackDto>> feedback(
			@Valid @RequestBody FeedbackDto obj,
			BindingResult bindingResult
	) {
		CommonResponseDto<FeedbackDto> response = anonymousServices.createFeedback(obj, bindingResult);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/search-order")
	public ResponseEntity<CommonResponseDto<List<BillDto>>> searchOrder(@RequestParam(defaultValue = "-1")  String phone) {
		CommonResponseDto<List<BillDto>> response = anonymousServices.getBillListByPhone(phone);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/order-detail")
	public ResponseEntity<CommonResponseDto<BillDetailDto>> orderDetail(@RequestParam(defaultValue = "-1") int orderId) {
		CommonResponseDto<BillDetailDto> response = anonymousServices.getBillDetailById(orderId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/scan-result")
	public ResponseEntity<CommonResponseDto<ProductDetailDto>> scanResult(@RequestParam(defaultValue = "-1")  String barcode) {
		CommonResponseDto<ProductDetailDto> response = anonymousServices.getProductDetailByBarCode(barcode);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}


}
