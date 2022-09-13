export default class userDTO {
  constructor({ email, password, username, phone, cart, chat, timestamp, _id, __v }) {
    this.email = email;
    this.username = username;
    this.cart = cart;
    this.chat = chat;
  }
}

export function userAsDto(data) {
  if (Array.isArray(data)) {
    return data.map((p) => new userDTO(p));
  } else {
    return new userDTO(data);
  }
}
