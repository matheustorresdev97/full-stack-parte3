import { Router } from "express"
import { ProductsControllers } from "@/controllers/products-controllers"

const productsRoutes = Router();
const productsControllers = new ProductsControllers()

productsRoutes.get("/", productsControllers.index)
productsRoutes.post("/", productsControllers.create)
productsRoutes.put("/:id", productsControllers.update)
productsRoutes.delete("/:id", productsControllers.remove)

export { productsRoutes }