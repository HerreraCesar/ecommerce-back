import FirebaseContainer from "../../containers/firebaseContainer.js";

class FirebaseCartsDao extends FirebaseContainer {
  constructor() {
    super("carts");
  }
}

export default FirebaseCartsDao;
