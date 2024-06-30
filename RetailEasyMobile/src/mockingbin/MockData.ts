import { BillsDto } from "../apis/dto/bills.dto.ts";
import { IBillItemDto } from "../apis/dto/bill.item.dto.ts";
import { SupplierDto } from "../apis/dto/supplier.dto.ts";

export const BillSearch: BillsDto[] = [
  {billId: 1, createdDate: "01-01-2000", status: true, total: 10000, phoneNumber: "0989762205"},
  {billId: 2, createdDate: "02-01-2000", status: true, total: 10000, phoneNumber: "0989762205"},
  {billId: 3, createdDate: "03-01-2000", status: false, total: 110400, phoneNumber: "0989762205"},
  {billId: 4, createdDate: "04-01-2000", status: true, total: 20000, phoneNumber: "0345154635"},
  {billId: 5, createdDate: "05-01-2000", status: false, total: 13000, phoneNumber: "0345154635"},
  {billId: 6, createdDate: "06-01-2000", status: true, total: 1043000, phoneNumber: "0345154635"},
  {billId: 7, createdDate: "07-01-2000", status: true, total: 45000, phoneNumber: "0345154635"},
]

export const BillItems: IBillItemDto[] = [
  {
    quantity: 1,
    product: {
      barcode: "8935001800354",
      productName: "test product name3",
      productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
      category: "initial category",
      brand: "init brand",
      manufacturedDate: "2024-06-20T16:56:11Z",
      expiry: "2024-06-20T16:56:11Z",
      stock: 10,
      price: 1000,
      status: true
    }
  },
  {
    quantity: 1,
    product: {
      barcode: "8935001800353",
      productName: "test product name2",
      productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
      category: "initial category",
      brand: "init brand",
      manufacturedDate: "2024-06-20T16:56:11Z",
      expiry: "2024-06-20T16:56:11Z",
      stock: 10,
      price: 1000,
      status: true
    }
  },
  {
    quantity: 1,
    product: {
      barcode: "8935001800352",
      productName: "test product name1",
      productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
      category: "initial category",
      brand: "init brand",
      manufacturedDate: "2024-06-20T16:56:11Z",
      expiry: "2024-06-20T16:56:11Z",
      stock: 10,
      price: 1000,
      status: true
    }
  },
  {
    quantity: 1,
    product: {
      barcode: "8935001800351",
      productName: "test product name0",
      productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
      category: "initial category",
      brand: "init brand",
      manufacturedDate: "2024-06-20T16:56:11Z",
      expiry: "2024-06-20T16:56:11Z",
      stock: 10,
      price: 1000,
      status: true
    }
  },
]

export const SupplierList: SupplierDto[] =  [
  {
    name: "tuan",
    phoneNumber: "0989762205"
  },
  {
    name: "ga",
    phoneNumber: "0989762206"
  },
  {
    name: "dmm",
    phoneNumber: "0989762207"
  },
  {
    name: "chien",
    phoneNumber: "0989762208"
  },
]
