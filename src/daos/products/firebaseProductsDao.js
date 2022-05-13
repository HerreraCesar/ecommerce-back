import FirebaseContainer from "../../containers/firebaseContainer.js";

class FirebaseProductsDao extends FirebaseContainer {
  constructor() {
    super("products");
  }
}

export default FirebaseProductsDao;
