export default class userDTO {
    constructor({email, password, username, phone, timestamp, _id, __v}) {
        this.email = email
        this.username = username
    }
}

export function userAsDto(data) {
    if (Array.isArray(data)) {
        return data.map(p => new userDTO(p))
    }
    else {
        return new userDTO(data)
    }
}