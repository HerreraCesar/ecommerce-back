import { errorLogger, requestLogger } from "../../controllers/loggers.js";

import config from "../config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString);

class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      return await this.collection.find().lean();
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        requestLogger.info(`No se ha encontrado el registro con id ${id}`);
        return false;
      }
      return content[index];
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async add(data) {
    try {
      await this.collection.create(data);
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
      await this.collection.replaceOne({ id: id }, registry);
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
      await this.collection.deleteOne({ id: id });
      return `El registro con id ${id} ha sido eliminado correctamente`;
    } catch (error) {
      errorLogger.error(error);
    }
  }
}

export default MongoContainer;
