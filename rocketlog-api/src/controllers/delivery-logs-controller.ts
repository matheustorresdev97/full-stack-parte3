import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class DeliveryLogsController {
    create = async (request: Request, response: Response) => {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        })

        const { delivery_id, description } = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
        })

        if (!delivery) {
            throw new AppError("Delivery not found", 404)
        }

        if (delivery.status === "processing") {
            throw new AppError("change status to shipped")
        }

        await prisma.deliveryLog.create({
            data: {
                deliveryId: delivery_id,
                description,
            },
        })

        response.status(201).json()
    }

    show = async (request: Request, response: Response) => {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        })

        const { delivery_id } = paramsSchema.parse(request.params)

        const delivery = await prisma.delivery.findUnique({
            where: {
                id: delivery_id,
            },
        })

        if (
            request.user?.role === "costumer" &&
            request.user.id !== delivery?.userId
        ) {
            throw new AppError("the user can only view their deliveries", 401)
        }

        response.json(delivery)
    }
}

export { DeliveryLogsController }