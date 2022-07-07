class MemoryContainer {
  constructor() {
    this.elementos = [];
  }

  getAll() {
    return this.elementos;
  }

  getById(id) {
    const content = this.getAll();
    const index = content.findIndex((register) => register.id === id);
    if (index === -1) {
      return `No se ha encontrado el registro con id ${id}`;
    }
    return register[index];
  }

  add(data) {
    const content = this.getAll();
    content.push(data);
    return (
      "Se ha agregado un registro correctamente con los siguientes datos: " +
      JSON.stringify(data)
    );
  }

  updateById(id, newData) {
    const content = this.getAll();
    const index = content.findIndex((register) => register.id === id);
    if (index === -1) {
      return `No se ha encontrado el registro con id ${id}`;
    }
    const timestamp = content[index].timestamp;
    const registry = { ...newData, id, timestamp };
    content.splice(index, 1, registry);
    return (
      `El registro con id ${id} ha sido actualizado correctamente con los siguientes datos: ` +
      JSON.stringify(newData)
    );
  }

  deleteById(id) {
    const content = this.getAll();
    const index = content.findIndex((register) => register.id === id);
    if (index === -1) {
      return `No se ha encontrado el registro con id ${id}`;
    }
    content.splice(index, 1);
    return `El registro con id ${id} ha sido eliminado correctamente`;
  }
}

export default MemoryContainer;
