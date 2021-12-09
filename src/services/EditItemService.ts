import axios from 'axios'
import * as db from '../db'

class EditItemService {
    async execute(
        accessToken: string,
        ml_id: string, 
        price: number) {
        
            try{

                //Update ML
                //https://developers.mercadolivre.com.br/pt_br/produto-sincronizacao-de-publicacoes                await axios.put(
                await axios.put(
                    `https://api.mercadolibre.com/items/${ml_id}`, 
                    {
                        //body:
                        price: price,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`
                        }
                    }
                )
                console.log('Item updated on ML')

                //Update db
                await db.query('UPDATE items SET price = $2 WHERE ml_id = $1', [ml_id, price])
                console.log('Item updated on the db')

                const item = {ml_id, price}
                return item

            } catch (err) {
                console.log(err)
                return err.status// || 500
            }
    }
}

export { EditItemService }