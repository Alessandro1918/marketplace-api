import axios from 'axios'
import * as db from '../db'

class DeleteItemService {
    async execute(
        accessToken: string,
        ml_id: string) {

            try{

                //Delete from ML
                //https://developers.mercadolivre.com.br/pt_br/produto-sincronizacao-de-publicacoes#Exclusão-de-publicações
                await axios.put(
                    `https://api.mercadolibre.com/items/${ml_id}`, 
                    {
                        //body:
                        status: 'closed',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`
                        }
                    }
                )
                await axios.put(
                    `https://api.mercadolibre.com/items/${ml_id}`, 
                    {
                        //body:
                        deleted: 'true',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${accessToken}`
                        }
                    }
                )
                console.log('Item deleted from ML')

                //Delete from db
                await db.query('DELETE FROM items WHERE ml_id = $1', [ml_id])
                console.log('Item deleted from db')

            } catch (err) {
                console.log(err)
                return err.status// || 500
            }
    }
}

export { DeleteItemService }