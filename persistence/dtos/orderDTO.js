import { cartAsDto } from "./cartDTO.js";

export default class orderDTO {
  constructor({ id, buyer, email, phone, cart, timestamp, _id, __v }) {
    this.id = id;
    this.email = email;
    this.cart = cartAsDto(cart);
    this.timestamp = timestamp;
  }
}

export function orderAsDto(data) {
  if (Array.isArray(data)) {
    return data.map((p) => new orderDTO(p));
  } else {
    return new orderDTO(data);
  }
}
