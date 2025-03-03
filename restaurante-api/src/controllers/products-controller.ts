import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex"
import z from "zod";
import { AppError } from "@/utils/AppError";

class ProductsController {
    index = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { name } = request.query

            const products = await knex<ProductRepository>("products")
                .select()
                .whereLike("name", `%${name ?? ""}%`)
                .orderBy("name")

            response.status(200).json({ products })
        } catch (error) {
            next(error);
        }
    }

    create = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0, { message: "value must be greater than 0 " })
            })

            const { name, price } = bodySchema.parse(request.body)

            await knex<ProductRepository>("products").insert({ name, price })

            response.status(201).json({ name, price })
        } catch (error) {
            next(error);
        }
    }

    update = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0, { message: "value must be greater than 0 " })
            })

            const { name, price } = bodySchema.parse(request.body)

            const product = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()

            if (!product) {
                throw new AppError("product not found")
            }


            await knex<ProductRepository>("products").update({ name, price, updated_at: knex.fn.now() }).where({ id })

            response.status(200).json({ name, price })
        } catch (error) {
            next(error);
        }
    }

    remove = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = z.string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number" })
                .parse(request.params.id)

            const product = await knex<ProductRepository>("products")
                .select()
                .where({ id })
                .first()

            if (!product) {
                throw new AppError("product not found")
            }

            await knex<ProductRepository>("products").delete().where({ id })

            response.status(200).json()
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController }