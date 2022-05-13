import MongoContainer from "../../containers/mongoContainer.js";

class MongoCartsDao extends MongoContainer {
  constructor() {
    super("orders", {
      id: { type: String, required: true },
      timestamp: { type: String, required: true },
      products: { type: Array, required: true },
    });
  }
}

export default MongoCartsDao;
