package org.retaileasy.retaileasyserver.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.retaileasy.retaileasyserver.models.BillItem;

import java.util.Set;

/**
 * @author tuan
 */

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class BillItemDto extends BillInfoDto  {
	private String storePhone;
	private Set<BillItem> itemList;
}
