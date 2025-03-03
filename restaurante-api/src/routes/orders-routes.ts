import { Router } from "express";
import { OrdersControllers } from "@/controllers/orders-controllers";

const ordersRoutes = Router();
const ordersControllers = new OrdersControllers();

ordersRoutes.post("/", ordersControllers.create)
ordersRoutes.get("/table-session/:tables_session_id", ordersControllers.index)
ordersRoutes.get("/table-session/:tables_session_id/total", ordersControllers.show)

export { ordersRoutes }