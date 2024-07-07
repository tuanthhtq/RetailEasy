import { BillsDto } from "../../apis/dto/bills.dto.ts";
import { BillSearch, Brands, Categories, StockItems, SupplierList } from "../MockData.ts";
import { SupplierDto } from "../../apis/dto/supplier.dto.ts";
import { ProductSimpleDto } from "../../apis/dto/product.simple.dto.ts";
import { CategoryDto } from "../../apis/dto/category.dto.ts";
import { BrandDto } from "../../apis/dto/brand.dto.ts";

export const getBillsByPhone = (phone: string): BillsDto[] => {
  let res: BillsDto[] = []
  for (const bill of BillSearch) {
    if(bill.phoneNumber === phone){
      res.push(bill)
    }
  }
  return res;
}


export const getSupplierByName = (name: string): SupplierDto[] => {
  let res: SupplierDto[] = [];
  for (const supplier of SupplierList) {
    if(res.length < 4 && supplier.name.startsWith(name)){
      res.push(supplier)

    }
  }
  return res;
}

export const get4LastSupplier = (): SupplierDto[] => {
  return SupplierList.slice(-4);
}

export const getSupplier = (phone: string): SupplierDto | null => {
  for (const item of SupplierList) {
    if(item.phoneNumber === phone){
      return item
    }
  }
  return null;
}


export const getStockProductByName = (name: string): ProductSimpleDto[] => {
  let res = [];
  for (const item of StockItems) {
    if(item.productName.includes(name)){
      res.push(item)
    }
  }
  return res;
}

export const getAmountStockProduct = (count: number): ProductSimpleDto[] => {
  let res = [];
  for (const item of StockItems) {
    if(res.length < count + 1){
      res.push(item)
    }
  }
  return res;
}

export const getStockProductById = (id: number): ProductSimpleDto | undefined => {
  for (const item of StockItems) {
    if(item.productId === id){
      return item;
    }
  }
  return undefined
}

export const getCategory = (name?: string): CategoryDto[] | [] => {
  let res: CategoryDto[] = [];
  if(name){
    for (const cat of Categories) {
      if(cat.categoryName.includes(name)){
        res.push(cat)
      }
    }
  }else{
    res = Categories
  }
  return res;
}
export const getBrand = (name?: string): BrandDto[] | [] => {
  let res: BrandDto[] = [];
  if(name){
    for (const brand of Brands) {
      if(brand.brandName.includes(name)){
        res.push(brand)
      }
    }
  }else{
    res = Brands
  }
  return res;
}
