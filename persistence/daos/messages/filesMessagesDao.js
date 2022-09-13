import FilesContainer from "../../containers/filesContainer.js";

class FilesMessagesDao extends FilesContainer {
  constructor() {
    super("./db/messages.json");
  }
}

export default FilesMessagesDao;
