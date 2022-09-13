import FilesContainer from "../../containers/filesContainer.js";

class FilesCartsDao extends FilesContainer {
  constructor() {
    super("./db/carts.json");
  }
}

export default FilesCartsDao;
