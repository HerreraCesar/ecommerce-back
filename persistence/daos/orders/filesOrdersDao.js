import FilesContainer from "../../containers/filesContainer.js";

class FilesOrdersDao extends FilesContainer {
  constructor() {
    super("./db/orders.json");
  }
}

export default FilesOrdersDao;
