import FilesContainer from "../../containers/filesContainer.js";

class FilesProductsDao extends FilesContainer {
  constructor() {
    super("./db/products.json");
  }
}

export default FilesProductsDao;
