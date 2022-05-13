import FirebaseContainer from "../../containers/firebaseContainer.js";

class FirebaseCartsDao extends FirebaseContainer {
  constructor() {
    super("orders");
  }
}

export default FirebaseCartsDao;
