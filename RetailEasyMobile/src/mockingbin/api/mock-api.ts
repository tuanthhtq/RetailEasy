import { BillsDto } from "../../apis/dto/bills.dto.ts";
import { BillSearch } from "../MockData.ts";

export const getBillsByPhone = (phone: string): BillsDto[] => {
  let res: BillsDto[] = []
  for (const bill of BillSearch) {
    if(bill.phoneNumber === phone){
      res.push(bill)
    }
  }
  return res;
}
