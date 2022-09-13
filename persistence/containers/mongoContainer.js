import { errorLogger, requestLogger } from "../../scripts/loggers.js";

import config from "../../config.js";
import mongoose from "mongoose";

mongoose.connect(config.mongodb.connectionString);

class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      return await this.collection.find().lean();
    } catch (error) {
      errorLogger.error(error);
      return `No se pudieron obtener los registros`;
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      } else {
        return content[index];
      }
    } catch (error) {
      errorLogger.error(error.message);
      return `No se pudo obtener el registro`;
    }
  }

  async getByCategory(category) {
    try {
      const content = await this.getAll();
      let result = [];
      content.forEach((register) => {
        if (register.category.toLowerCase() === category.toLowerCase()) {
          result.push(register);
        }
      });
      return result;
    } catch (error) {
      errorLogger.error(error.message);
      return `No se pudo obtener el registro`;
    }
  }

  async getByEmail(email) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.email === email);
      if (index === -1) {
        return false;
      } else {
        return content[index];
      }
    } catch (error) {
      errorLogger.error(error.message);
      return `No se pudo obtener el registro`;
    }
  }

  async add(data) {
    try {
      await this.collection.create(data);
      return data;
    } catch (error) {
      errorLogger.error(error.message);
      return `No se pudo agregar el registro`;
    }
  }

  async updateById(id, newData) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      } else {
        const timestamp = content[index].timestamp;
        const registry = { ...newData, id, timestamp };
        await this.collection.replaceOne({ id: id }, registry);
        return { old: content[index], new: registry };
      }
    } catch (error) {
      errorLogger.error(error.message);
      return `No se pudo actualizar el registro`;
    }
  }

  async updateByEmail(email, newData) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.email === email);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${email}`;
      } else {
        const timestamp = content[index].timestamp;
        const registry = { ...newData, email, timestamp };
        await this.collection.replaceOne({ email: email }, registry);
        return { old: content[index], new: registry };
      }
    } catch (error) {
      errorLogger.error(error.message);
      return `No se pudo actualizar el registro`;
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      } else {
        await this.collection.deleteOne({ id: id });
        return content[index];
      }
    } catch (error) {
      errorLogger.error(error.message);
    }
  }
}

export default MongoContainer;
