import * as fs from "fs";

import {errorLogger, requestLogger} from '../../scripts/loggers.js'

class FilesContainer {
  constructor(filename) {
    this.filename = filename;
  }

  async write(data) {
    try {
      await fs.promises.writeFile(this.filename, data);
      requestLogger.info("Escrito correctamente");
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.filename, "utf-8"));
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      }
      return register[index];
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async add(data) {
    try {
      const content = await this.getAll();
      content.push(data);
      await this.write(JSON.stringify(content));
      return (
        "Se ha agregado un registro correctamente con los siguientes datos: " +
        JSON.stringify(data)
      );
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async updateById(id, newData) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      }
      const timestamp = content[index].timestamp;
      const registry = { ...newData, id, timestamp };
      content.splice(index, 1, registry);
      await this.write(JSON.stringify(content));
      return (
        `El registro con id ${id} ha sido actualizado correctamente con los siguientes datos: ` +
        JSON.stringify(newData)
      );
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      }
      content.splice(index, 1);
      await this.write(JSON.stringify(content));
      return `El registro con id ${id} ha sido eliminado correctamente`;
    } catch (error) {
      errorLogger.error(error);
    }
  }
}

export default FilesContainer;
