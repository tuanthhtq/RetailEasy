import { ProductDetailDto } from "./product.detail.dto.ts";


export interface BillItemDto {
  quantity: number,
  product: ProductDetailDto
}
