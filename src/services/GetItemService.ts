import axios from 'axios'
import * as db from '../db'

class GetItemService {
    async execute(ml_id: string) {
        
        const { rows } = await db.query('SELECT * FROM items WHERE ml_id=$1', [ml_id])

        return rows
    }
}

export { GetItemService }