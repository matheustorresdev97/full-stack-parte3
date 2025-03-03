import { ErrorRequestHandler } from "express";
import { AppError } from "@/utils/AppError";

export const errorHandling: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
    } else {
        response.status(500).json({ message: error.message });
    }
};