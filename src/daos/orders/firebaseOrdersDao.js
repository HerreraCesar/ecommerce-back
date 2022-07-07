import FirebaseContainer from "../../containers/firebaseContainer.js";

class FirebaseOrdersDao extends FirebaseContainer {
  constructor() {
    super("orders");
  }
}

export default FirebaseOrdersDao;
