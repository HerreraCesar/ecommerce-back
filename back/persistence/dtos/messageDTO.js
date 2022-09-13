export default class messageDTO {
    constructor({ chat, author, text, timestamp, _id, __v }) {
      this.author = author;
      this.text = text;
      this.timestamp = timestamp;
    }
}
  
export function messageAsDto(data) {
    if (Array.isArray(data)) {
      return data.map((p) => new messageDTO(p));
    } else {
      return new messageDTO(data);
    }
}
  