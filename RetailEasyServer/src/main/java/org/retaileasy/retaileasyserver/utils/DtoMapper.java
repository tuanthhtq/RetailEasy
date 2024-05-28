package org.retaileasy.retaileasyserver.utils;


import org.retaileasy.retaileasyserver.dtos.BillInfoDto;
import org.retaileasy.retaileasyserver.dtos.ProductDetailDto;
import org.retaileasy.retaileasyserver.dtos.UserDataDto;
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

    public static ProductDetailDto toProductDetailDto(Product product){
        return new ProductDetailDto(
                product.getId(),
                product.getProductName(),
                product.getCategory().getCategoryName(),
                product.getSupplier().getName(),
                product.getBrand().getBrandName(),
                product.getManufacturedDate(),
                product.getExpiry(),
                product.getStock(),
                product.getPrice(),
                (product.getStatus().getStatusValue() == 1) ? "Available" : "Unavailable",
                product.getDiscount().getDiscount(),
                product.getDiscount().getStartDate(),
                product.getDiscount().getEndDate()
        );
    }

    public static BillInfoDto toBillInfoDto(Bill bill){
        int total = 0;
        for(BillItem item : bill.getBillItems()){
            total += item.getPrice();
        }

        return new BillInfoDto(
                bill.getId(),
                bill.getCreator().getFullName(),
                total,
                bill.getCreatedDate()
        );
    }

}
