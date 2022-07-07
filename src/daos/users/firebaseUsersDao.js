import FirebaseContainer from "../../containers/firebaseContainer.js";

class FirebaseUsersDao extends FirebaseContainer {
  constructor() {
    super("users");
  }
}

export default FirebaseUsersDao;
