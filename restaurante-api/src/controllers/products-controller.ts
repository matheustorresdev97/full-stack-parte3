import { Request, Response, NextFunction } from "express";

class ProductsController {
    index = async (request: Request, response: Response, next: NextFunction) => {
        try {
            response.json({ message: "OK" });
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController }