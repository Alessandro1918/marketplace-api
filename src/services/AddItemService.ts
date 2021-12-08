import axios from 'axios'
import * as db from '../db'

class AddItemService {
    async execute(
        title: string, 
        category_id: string, 
        price: number, 
        currency_id: string, 
        available_quantity: number,
        condition: string,
        listing_type_id: string) {

        //const accessToken = 'APP_USR-8565598613236594-120705-c3ea605372aeb7648af0fc7fcf0ac5db-157958562'
        //const accessToken = 'APP_USR-8565598613236594-120714-f6eb112899b91ebe6b45d00a1e111f01-157958562'      //403 - invalid
        //const accessToken = 'APP_USR-8565598613236594-120718-a1a05220fb37bf8ea9c466d6d0cbb276-157958562'      //401 - expired_token
        const accessToken = 'APP_USR-8565598613236594-120802-abbac6cfe2896c452100aa6c6ad0026b-157958562'

        try {

            //Update ML
            const response = await axios.post(
                "https://api.mercadolibre.com/items", 
                {
                    title: `Anúncio de Teste - Não ofertar - ${title}`,
                    category_id: category_id,
                    price: price,
                    currency_id: currency_id,
                    available_quantity: available_quantity,
                    condition: condition,
                    listing_type_id: listing_type_id,
                    pictures: [
                        {source: "http://mla-s2-p.mlstatic.com/968521-MLA20805195516_072016-O.jpg"},
                        {source: "http://mla-s2-p.mlstatic.com/968521-MLA20805195516_072016-O.jpg"}
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            )
            //console.log(response.data)
            console.log('Item updated on ML')

            //Setup data
            //const ml_id = 'MLB2105466457'
            const { id, permalink, pictures } = response.data
            //console.log(id, permalink, pictures)
            
            //Update db 
            await db.query('INSERT INTO items (title, category_id, price, currency_id, available_quantity, condition, listing_type_id, ml_id, ml_url, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [title, category_id, price, currency_id, available_quantity, condition, listing_type_id, id, permalink, [pictures[0].url]])
            console.log('Item updated on db')

            //Return
            const item = {
                title, 
                category_id, 
                price, 
                currency_id, 
                available_quantity, 
                condition,
                listing_type_id,
                ml_id: id, 
                ml_url: permalink, 
                pictures: [pictures[0].url]}
            return item

        } catch (err) {
            console.log(err)
            return err.status// || 500
        }
    }
}

export { AddItemService }