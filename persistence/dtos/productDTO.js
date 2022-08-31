export default class productDTO {
    constructor({id, title, price, thumbnail, timestamp, _id, __v}) {
        this.id = id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

export function productAsDto(data) {
    if (Array.isArray(data)) {
        return data.map(p => new productDTO(p))
    }
    else {
        return new productDTO(data)
    }
}