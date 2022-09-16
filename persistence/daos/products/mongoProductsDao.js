import MongoContainer from "../../containers/mongoContainer.js";

class MongoProductsDao extends MongoContainer {
  constructor() {
    super("products", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
      category: { type: String, required: true },
      id: { type: String, required: true },
      timestamp: { type: Number, required: true },
    });
  }
}

export default MongoProductsDao;
