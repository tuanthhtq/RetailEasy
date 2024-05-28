package org.retaileasy.retaileasyserver.services.anonymous;

import org.retaileasy.retaileasyserver.dtos.BillInfoDto;
import org.retaileasy.retaileasyserver.dtos.BillItemDto;
import org.retaileasy.retaileasyserver.dtos.ProductDetailDto;
import org.retaileasy.retaileasyserver.models.Bill;
import org.retaileasy.retaileasyserver.models.Product;
import org.retaileasy.retaileasyserver.repository.BillRepository;
import org.retaileasy.retaileasyserver.repository.ProductRepository;
import org.retaileasy.retaileasyserver.utils.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnonymousServicesImpl implements AnonymousServices{

	private ProductRepository productRepository;
	private BillRepository billRepository;

	@Autowired
	public AnonymousServicesImpl(
			ProductRepository pr,
			BillRepository br
	){
		this.billRepository = br;
		this.productRepository = pr;
	}


	@Override
	public ProductDetailDto getProductByBarCode(String barcode) {
		Product product = productRepository.findByBarcodes_Code(barcode)
				.orElse(null);
		if(product != null){
			return DtoMapper.toProductDetailDto(product);
		}
		return null;
	}

	@Override
	public ProductDetailDto getProductById(int productId) {
		Product product = productRepository.findById(productId)
				.orElse(null);
		if(product != null){
			return DtoMapper.toProductDetailDto(product);
		}
		return null;
	}

	@Override
	public Page<BillInfoDto> getBillsListByPhone(String phoneNumber, int page ) {
		Pageable pageable = PageRequest.of(page, 10, Sort.Direction.DESC);

		return billRepository.findByCustomerPhone(phoneNumber, pageable)
				.map(DtoMapper::toBillInfoDto);
	}

	@Override
	public List<BillItemDto> getBillItemsByBillId(int billId) {
		return null;
	}
}
