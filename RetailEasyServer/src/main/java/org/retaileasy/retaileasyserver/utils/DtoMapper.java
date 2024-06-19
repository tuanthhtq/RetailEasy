package org.retaileasy.retaileasyserver.utils;


import org.retaileasy.retaileasyserver.dtos.common.ProductDetailDto;
import org.retaileasy.retaileasyserver.dtos.UserDataDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDetailDto;
import org.retaileasy.retaileasyserver.dtos.common.BillDto;
import org.retaileasy.retaileasyserver.dtos.common.BillItemDto;
import org.retaileasy.retaileasyserver.models.Bill;
import org.retaileasy.retaileasyserver.models.BillItem;
import org.retaileasy.retaileasyserver.models.Product;
import org.retaileasy.retaileasyserver.models.User;

import java.util.stream.Collectors;

public class DtoMapper {

    public static UserDataDto toUserDataDto(User user, String accessToken){
        return new UserDataDto(
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getPassword(),
                accessToken,
                user.getAddress(),
                user.getUserRoles().stream().map(role -> role.getRole().getRoleName()).collect(Collectors.toSet())
        );
    }

    public static ProductDetailDto toProductDetailDto(Product product, String scannedBarcode){
        return new ProductDetailDto(
                scannedBarcode,
                product.getProductName(),
                product.getProductImage(),
                product.getCategory().getCategoryName(),
                product.getBrand().getBrandName(),
                product.getManufacturedDate(),
                product.getExpiry(),
                product.getStock(),
                product.getPrice(),
                product.getStatus().getStatusValue() == 1
        );
    }

    public static BillDto toBillInfoDto(Bill bill){
        int total = 0;
        for(BillItem item : bill.getBillItems()){
            total += item.getPrice();
        }

        return new BillDto(
                bill.getId(),
                bill.getStatus() == 1,
                total,
                bill.getCreatedDate()
        );
    }

    public static BillDetailDto toBillDetailDto(Bill bill) {
        int total = 0;
        for(BillItem item : bill.getBillItems()){
            total += item.getPrice();
        }

        return new BillDetailDto(
                bill.getId(),
                total,
                bill.getCreator().getFullName(),
                bill.getStore().getName(),
                bill.getCreatedDate(),
                bill.getBillItems().stream().map(item -> new BillItemDto(
                        item.getProduct().getProductName(),
                        item.getProduct().getProductImage(),
                        item.getQuantity(),
                        item.getPrice()
                )).collect(Collectors.toList()),
                bill.getStatus() == 1
        );
    }

}
