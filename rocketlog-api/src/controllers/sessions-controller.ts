import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { sign, SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import z from "zod";

class SessionsController {
    create = async (request: Request, response: Response) => {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { email, password } = bodySchema.parse(request.body);

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Invalid email or password", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const options: SignOptions = {
            expiresIn,
            subject: String(user.id)
        };

        const token = sign({ role: user.role ?? "customer" }, secret, options);

        const { password: hashedPassword, ...userWithoutPassword } = user;

        response.json({ token, user: userWithoutPassword });
    }
}

export { SessionsController };