import MongoContainer from "../../containers/mongoContainer.js";

class MongoMessagesDao extends MongoContainer {
  constructor() {
    super("messages", {
      chat: { type: String, required: true },
      author: {type: String, required: true},
      text: { type: String, required: true },
      timestamp: { type: String, required: true },
    });
  }
}

export default MongoMessagesDao;
