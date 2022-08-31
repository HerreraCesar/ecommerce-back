import FilesContainer from "../../containers/filesContainer.js";

class FilesUsersDao extends FilesContainer {
  constructor() {
    super("./db/users.json");
  }
}

export default FilesUsersDao;
