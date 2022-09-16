import MongoContainer from "../../containers/mongoContainer.js";

class MongoCartsDao extends MongoContainer {
  constructor() {
    super("carts", {
      id: { type: String, required: true },
      timestamp: { type: Number, required: true },
      products: { type: Array, required: true },
      total: { type: Number, required: true },
    });
  }
}

export default MongoCartsDao;
