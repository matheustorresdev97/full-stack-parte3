import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class DeliveryLogsController {
    create = async (request: Request, response: Response) => {
        response.json({ message: "OK!" })
    }
}

export { DeliveryLogsController }