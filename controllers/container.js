import * as fs from 'fs';

class Container {

    constructor(filename) {
        this.filename = filename;
    }

    async write(data) {
        try {
            await fs.promises.writeFile(this.filename, data);
            console.log('Escrito correctamente');
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'))
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const contenido = await this.getAll()
            const register = contenido.filter((p) => p.id === id )
            if (register.length === 0) {
                return 'Registro no encontrado'
            }
            return register[0]
            
        } catch (error) {
            console.log(error);
        }
    }

    async add(data) {
        try {
            const content = await this.getAll()
            content.push(data)
            await this.write(JSON.stringify(content))
            return 'Registro agregado correctamente'
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(id, newData) {
        try {
            const content = await this.getAll()
            const index = content.findIndex( register => register.id === id);
            if (index === -1) {
                return 'Registro no encontrado'
            }
            const timestamp = content[index].timestamp
            const registry = {...newData, id, timestamp}
            content.splice(index, 1, registry)
            await this.write(JSON.stringify(content))
            return 'Registro actualizado correctamente'
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const content = await this.getAll()
            const index = content.findIndex( register => register.id === id);
            content.splice(index, 1)
            await this.write(JSON.stringify(content))
            return 'Registro eliminado correctamente'
            
        } catch (error) {
            console.log(error);
        }
    }
    
}


export default Container;