import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandling(
    error: any, request: Request, response: Response, next: NextFunction
) {

    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message })
    }

    if (error instanceof ZodError) {
        response.status(400).json({
            message: "validation error",
            issues: error.format(),
        })
    }

    response.status(500).json({ message: error.message })
}