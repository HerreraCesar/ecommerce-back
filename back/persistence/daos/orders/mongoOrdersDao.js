import MongoContainer from "../../containers/mongoContainer.js";

class MongoOrdersDao extends MongoContainer {
  constructor() {
    super("orders", {
      id: { type: String, required: true },
      buyer: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      cart: { type: Array, required: true },
      timestamp: { type: String, required: true },
    });
  }
}

export default MongoOrdersDao;
