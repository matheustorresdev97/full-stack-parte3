import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
    #database = {}

    constructor() {
        this.loadDatabase()
    }

    async loadDatabase() {
        try {
            const data = await fs.readFile(DATABASE_PATH, "utf8")
            this.#database = JSON.parse(data)
        } catch {
            this.#persist() // Se o arquivo não existir, cria um banco vazio
        }
    }

    #persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }

    // Método de inserção de dados
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }


    select(table, filters) {
        let data = this.#database[table] ?? []

        if (filters) {
            data = data.filter((row) => {
                return Object.entries(filters).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }


    find(table, id) {
        return this.#database[table]?.find((row) => row.id === id) ?? null
    }


    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {
                ...this.#database[table][rowIndex],
                ...data,
            }

            this.#persist()
        }
    }


    remove(table, id) {
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist() // Persistir após remoção
        }
    }
}