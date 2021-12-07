import { Request, Response } from 'express'
import { DeleteItemService } from '../services/DeleteItemService'

class DeleteItemController {
    async handle(req: Request, res: Response) {

        //Get data
        const ml_id = req.params.ml_id

        //Instanciate new Service
        const service = new DeleteItemService()

        //Execute
        try {
            const result = await service.execute(ml_id)
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { DeleteItemController }