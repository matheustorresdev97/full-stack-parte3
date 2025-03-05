import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import z from "zod";

class DeliveriesController {
    create = async (request: Request, response: Response) => {
        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),
        })

        const { user_id, description } = bodySchema.parse(request.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        })

        response.status(201).json()
    }

    index = async (request: Request, response: Response) => {
        const deliveries = await prisma.delivery.findMany({
            include: {
                user: { select: { name: true, email: true } }
            }
        })

        response.json(deliveries)
    }
}

export { DeliveriesController }