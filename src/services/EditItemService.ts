import * as db from '../db'

class EditItemService {
    async execute(
        ml_id: string,
        title: string, 
        category_id: string, 
        price: number, 
        currency_id: string, 
        available_quantity: number) {
        
        //Update ML - TODO

        //Update db
        await db.query('UPDATE items SET title = $2, category_id = $3, price = $4, currency_id = $5, available_quantity = $6 WHERE ml_id = $1', [ml_id, title, category_id, price, currency_id, available_quantity])
        
        const item = {ml_id, title, category_id, price, currency_id, available_quantity}
        return item
    }
}

export { EditItemService }