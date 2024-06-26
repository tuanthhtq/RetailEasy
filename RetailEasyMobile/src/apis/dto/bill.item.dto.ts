import { ProductDetailDto } from "./productDetail.dto.ts";


export interface IBillItemDto {
  quantity: number,
  product: ProductDetailDto
}
