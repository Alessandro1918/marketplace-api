import * as db from '../db'

class DeleteItemService {
    async execute(ml_id: string) {
        
        //Update ML - TODO

        //Update db
        await db.query('DELETE FROM items WHERE ml_id = $1', [ml_id])
    }
}

export { DeleteItemService }