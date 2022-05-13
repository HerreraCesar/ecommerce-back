import FilesContainer from "../../containers/filesContainer.js";

class FilesCartsDao extends FilesContainer {
  constructor() {
    super("./db/orders.json");
  }
}

export default FilesCartsDao;
