import MongoContainer from "../../containers/mongoContainer.js";

class MongoUsersDao extends MongoContainer {
  constructor() {
    super("users", {
      id: { type: String, required: true },
      password: { type: String, required: true },
      username: { type: String, required: true },
      direction: { type: String, required: true },
      age: { type: Number, required: true },
      phone: { type: String, required: true },
      photo: { type: String, required: true },
      timestamp: { type: Number, required: true },
      cart: { type: String, required: true },
    });
  }
}

export default MongoUsersDao;
