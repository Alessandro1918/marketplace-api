import { Request, Response } from 'express'
import { EditItemService } from '../services/EditItemService'

class EditItemController {
    async handle(req: Request, res: Response) {

        //Get data
        const ml_id = req.params.ml_id
        const { price } = req.body
        const { authorization } = req.headers   //'Bearer APP_USR-85...'
        const accessToken = authorization.split(' ')[1]

        //Instanciate new Service
        const service = new EditItemService()

        //Execute
        try {
            const result = await service.execute(accessToken, ml_id, price)
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { EditItemController }