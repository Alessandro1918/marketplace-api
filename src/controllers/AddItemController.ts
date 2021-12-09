import { Request, Response } from 'express'
import { AddItemService } from '../services/AddItemService'

class AddItemController {
    async handle(req: Request, res: Response) {

        //Get data
        const { title, 
                description,
                category_id, 
                price, 
                currency_id, 
                available_quantity,
                condition,
                listing_type_id } = req.body
        const { authorization } = req.headers   //'Bearer APP_USR-85...'
        const accessToken = authorization.split(' ')[1]

        //Instanciate new Service
        const service = new AddItemService()

        //Execute
        try {
            const result = await service.execute(accessToken, title, description, category_id, price, currency_id, available_quantity, condition, listing_type_id)
            return res.json(result)
        } catch (err) {
            return res.status(err.status).json(err.message)
        }
    }
}

export { AddItemController }