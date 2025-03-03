import { Router } from "express";
import { TablesSessionsControllers } from "@/controllers/tables-sessions-controllers";




const tablesSessionsRoutes = Router();
const tablesSessionsControllers = new TablesSessionsControllers();

tablesSessionsRoutes.get("/", tablesSessionsControllers.index)
tablesSessionsRoutes.post("/", tablesSessionsControllers.create)
tablesSessionsRoutes.patch("/:id", tablesSessionsControllers.update)

export { tablesSessionsRoutes };