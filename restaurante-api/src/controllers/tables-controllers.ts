import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";


class TableController {
    index = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.query;
            const tables = await knex<TablesRepository>("tables").select().orderBy("table_number")

            response.status(200).json(tables)
        } catch (error) {
            next(error)
        }
    }
}

export { TableController }