import * as db from '../db'

class GetItemsService {
    async execute() {
        
        const { rows } = await db.query('SELECT * FROM items')

        return rows
    }
}

export { GetItemsService }