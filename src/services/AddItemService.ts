import axios from 'axios'
import * as db from '../db'

class AddItemService {
    async execute(
        accessToken: string,
        title: string, 
        description: string,
        category_id: string, 
        price: number, 
        currency_id: string, 
        available_quantity: number,
        condition: string,
        listing_type_id: string) {

        //V1: accessToken hardcoded
        //const accessToken = 'APP_USR-8565598613236594-120705-c3ea605372aeb7648af0fc7fcf0ac5db-157958562'
        //const accessToken = 'APP_USR-8565598613236594-120802-abbac6cfe2896c452100aa6c6ad0026b-157958562'
        //const accessToken = 'APP_USR-8565598613236594-120819-2c273d4dbb975d5b05e847e75cf0a0e8-157958562'
        //V2: accessToken <- controller <- api <- 'addItem 'webpage <- context

        try {

            //Add item to ML
            const response = await axios.post(
                "https://api.mercadolibre.com/items", 
                {
                    //body:
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

            //Setup data
            //console.log(response.data)
            const { id, permalink, pictures } = response.data
            //console.log(id, permalink, pictures)
            
            //Add description to ML item - yep, on another POST
            //https://developers.mercadolivre.com.br/pt_br/descricao-de-produtos
            await axios.post(
                `https://api.mercadolibre.com/items/${id}/description`, 
                //body:
                {
                    plain_text: description
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            )            
            console.log('Item added on ML')

            //Add to db 
            await db.query('INSERT INTO items (title, description, category_id, price, currency_id, available_quantity, condition, listing_type_id, ml_id, ml_url, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [title, description, category_id, price, currency_id, available_quantity, condition, listing_type_id, id, permalink, [pictures[0].url]])
            console.log('Item added on db')

            //Return
            const item = {
                title, 
                description,
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