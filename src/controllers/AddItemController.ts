import { Request, Response } from 'express'
import { AddItemService } from '../services/AddItemService'

class AddItemController {
    async handle(req: Request, res: Response) {

        //Get data
        const { title, 
                category_id, 
                price, 
                currency_id, 
                available_quantity,
                condition,
                listing_type_id } = req.body

        //Instanciate new Service
        const service = new AddItemService()

        //Execute
        try {
            const result = await service.execute(title, category_id, price, currency_id, available_quantity, condition, listing_type_id)
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { AddItemController }