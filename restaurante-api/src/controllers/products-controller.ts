import { Request, Response, NextFunction } from "express";
import z from "zod";

class ProductsController {
    index = async (request: Request, response: Response, next: NextFunction) => {
        try {
            response.json({ message: "OK" });
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

            response.status(201).json({ name, price })
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController }