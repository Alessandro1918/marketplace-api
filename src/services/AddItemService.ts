import * as db from '../db'

class AddItemService {
    async execute(
        title: string, 
        category_id: string, 
        price: number, 
        currency_id: string, 
        available_quantity: number) {
        
        //Update ML - TODO
        const ml_id = '5678'

        //Update db 
        await db.query('INSERT INTO items (ml_id, title, category_id, price, currency_id, available_quantity) VALUES ($1, $2, $3, $4, $5, $6)', [ml_id, title, category_id, price, currency_id, available_quantity])
        
        const item = {ml_id, title, category_id, price, currency_id, available_quantity}
        return item
    }
}

export { AddItemService }