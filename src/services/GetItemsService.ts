import * as db from '../db'

class GetItemsService {
    async execute() {
        
        const { rows } = await db.query('SELECT * FROM items ORDER BY id DESC')

        return rows
    }
}

export { GetItemsService }