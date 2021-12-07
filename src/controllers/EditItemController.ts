import { Request, Response } from 'express'
import { EditItemService } from '../services/EditItemService'

class EditItemController {
    async handle(req: Request, res: Response) {

        //Get data
        const ml_id = req.params.ml_id
        const { title, 
                category_id, 
                price, 
                currency_id, 
                available_quantity } = req.body

        //Instanciate new Service
        const service = new EditItemService()

        //Execute
        try {
            const result = await service.execute(ml_id, title, category_id, price, currency_id, available_quantity)
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { EditItemController }