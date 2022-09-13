import MongoContainer from "../../containers/mongoContainer.js";

class MongoUsersDao extends MongoContainer {
  constructor() {
    super("users", {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      username: { type: String, required: true },
      phone: { type: String, required: true },
      timestamp: { type: Number, required: true },
      cart: { type: String, required: true },
      chat: { type: String, required: true },
    });
  }
}

export default MongoUsersDao;
