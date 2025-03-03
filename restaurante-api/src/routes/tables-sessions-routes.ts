import { Router } from "express";
import { TablesSessionsControllers } from "@/controllers/tables-sessions-controllers";




const tablesSessionsRoutes = Router();
const tablesSessionsControllers = new TablesSessionsControllers();

tablesSessionsRoutes.post("/", tablesSessionsControllers.create)

export { tablesSessionsRoutes };