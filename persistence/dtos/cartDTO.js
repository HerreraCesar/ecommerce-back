import { productAsDto } from "./productDTO.js";

productAsDto;
export default class cartDTO {
  constructor({ id, products, timestamp, _id, __v }) {
    this.id = id;
    this.products = productAsDto(products);
  }
}

export function cartAsDto(data) {
  if (Array.isArray(data)) {
    return data.map((p) => new cartDTO(p));
  } else {
    return new cartDTO(data);
  }
}
