import { Request, Response } from 'express'
import { GetItemsService } from '../services/GetItemsService'

class GetItemsController {
    async handle(req: Request, res: Response) {

        //Get data
        //const { code } = req.body

        //Instanciate new Service
        const service = new GetItemsService()

        //Execute
        try {
            const result = await service.execute()
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { GetItemsController }