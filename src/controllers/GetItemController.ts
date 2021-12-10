import { Request, Response } from 'express'
import { GetItemService } from '../services/GetItemService'

class GetItemController {
    async handle(req: Request, res: Response) {

        //Get data
        const ml_id = req.params.ml_id

        //Instanciate new Service
        const service = new GetItemService()

        //Execute
        try {
            const result = await service.execute(ml_id)
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { GetItemController }