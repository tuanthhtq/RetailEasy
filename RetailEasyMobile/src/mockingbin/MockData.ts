import { BillsDto } from "../apis/dto/bills.dto.ts";

export const BillSearch: BillsDto[] = [
  {billId: 1, createdDate: "01-01-2000", status: true, total: 10000, phoneNumber: "0989762205"},
  {billId: 2, createdDate: "02-01-2000", status: true, total: 10000, phoneNumber: "0989762205"},
  {billId: 3, createdDate: "03-01-2000", status: false, total: 110400, phoneNumber: "0989762205"},
  {billId: 4, createdDate: "04-01-2000", status: true, total: 20000, phoneNumber: "0345154635"},
  {billId: 5, createdDate: "05-01-2000", status: false, total: 13000, phoneNumber: "0345154635"},
  {billId: 6, createdDate: "06-01-2000", status: true, total: 1043000, phoneNumber: "0345154635"},
  {billId: 7, createdDate: "07-01-2000", status: true, total: 45000, phoneNumber: "0345154635"},
]
