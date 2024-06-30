import { ProductDetailDto } from "./product.detail.dto.ts";


export interface IBillItemDto {
  quantity: number,
  product: ProductDetailDto
}
