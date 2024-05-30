package org.retaileasy.retaileasyserver.dtos.payment;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ItemDto {
    private int productId;
    private String name;
    private int price;
    private int quantity;

}
