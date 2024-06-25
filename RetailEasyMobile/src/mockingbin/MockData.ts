import { BillsDto } from "../apis/dto/bills.dto.ts";
import { ProductDetailDto } from "../apis/dto/productDetail.dto.ts";

export const BillSearch: BillsDto[] = [
  {billId: 1, createdDate: "01-01-2000", status: true, total: 10000, phoneNumber: "0989762205"},
  {billId: 2, createdDate: "02-01-2000", status: true, total: 10000, phoneNumber: "0989762205"},
  {billId: 3, createdDate: "03-01-2000", status: false, total: 110400, phoneNumber: "0989762205"},
  {billId: 4, createdDate: "04-01-2000", status: true, total: 20000, phoneNumber: "0345154635"},
  {billId: 5, createdDate: "05-01-2000", status: false, total: 13000, phoneNumber: "0345154635"},
  {billId: 6, createdDate: "06-01-2000", status: true, total: 1043000, phoneNumber: "0345154635"},
  {billId: 7, createdDate: "07-01-2000", status: true, total: 45000, phoneNumber: "0345154635"},
]

export const BillItems: ProductDetailDto[] = [
  {
    barcode: "8935001800354",
    productName: "test product name",
    productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
    category: "initial category",
    brand: "init brand",
    manufacturedDate: "2024-06-20T16:56:11Z",
    expiry: "2024-06-20T16:56:11Z",
    stock: 10,
    price: 1000,
    status: true
  },
  {
    barcode: "8935001800354",
    productName: "test product name",
    productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
    category: "initial category",
    brand: "init brand",
    manufacturedDate: "2024-06-20T16:56:11Z",
    expiry: "2024-06-20T16:56:11Z",
    stock: 10,
    price: 1000,
    status: true
  },  {
    barcode: "8935001800354",
    productName: "test product name",
    productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
    category: "initial category",
    brand: "init brand",
    manufacturedDate: "2024-06-20T16:56:11Z",
    expiry: "2024-06-20T16:56:11Z",
    stock: 10,
    price: 1000,
    status: true
  },  {
    barcode: "8935001800354",
    productName: "test product name",
    productImage: "https://www.shutterstock.com/image-photo/very-random-pose-asian-men-260nw-2423213779.jpg",
    category: "initial category",
    brand: "init brand",
    manufacturedDate: "2024-06-20T16:56:11Z",
    expiry: "2024-06-20T16:56:11Z",
    stock: 10,
    price: 1000,
    status: true
  },
]
