import { Request, Response } from "express";

class UserController {
    create = async (request: Request, response: Response) => {
        response.json({ message: "ok" })
    }
}


export { UserController }