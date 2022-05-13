import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class FirebaseContainer {
  constructor(collection) {
    this.collection = db.collection(collection);
  }
  async getAll() {
    try {
      let response = [];
      const querySnapshot = await this.collection.get();
      const docs = querySnapshot.docs;
      docs.map((doc) => response.push(doc.data()));
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      }
      return content[index];
    } catch (error) {
      console.log(error);
    }
  }

  async add(data) {
    try {
      await this.collection.doc(`${data.id}`).create(data);

      return (
        "Se ha agregado un registro correctamente con los siguientes datos: " +
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
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
      await this.collection.doc(`${id}`).update(registry);
      return (
        `El registro con id ${id} ha sido actualizado correctamente con los siguientes datos: ` +
        JSON.stringify(newData)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const content = await this.getAll();
      const index = content.findIndex((register) => register.id === id);
      if (index === -1) {
        return `No se ha encontrado el registro con id ${id}`;
      }
      await this.collection.doc(`${id}`).delete();
      return `El registro con id ${id} ha sido eliminado correctamente`;
    } catch (error) {
      console.log(error);
    }
  }
}

export default FirebaseContainer;
