import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
    async handle(req: Request, res: Response) {

        //Get data
        const { code } = req.body

        //Instanciate new Service
        const service = new AuthenticateUserService()

        //Execute
        try {
            const result = await service.execute(code)
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { AuthenticateUserController }