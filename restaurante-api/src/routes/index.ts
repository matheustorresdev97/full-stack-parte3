import { Router } from "express"

import { productsRoutes } from "./products-routes"
import { tablesRoutes } from "./tables-routes"
import { tablesSessionsRoutes } from "./tables-sessions-routes"

const routes = Router()
routes.use("/products", productsRoutes)
routes.use("/tables", tablesRoutes)
routes.use("/tables_sessions", tablesSessionsRoutes)

export { routes }