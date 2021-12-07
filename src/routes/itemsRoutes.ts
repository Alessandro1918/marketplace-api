import { Router } from 'express'
import { GetItemsController } from '../controllers/GetItemsController'
import { AddItemController } from '../controllers/AddItemController'
import { EditItemController } from '../controllers/EditItemController'
import { DeleteItemController } from '../controllers/DeleteItemController'

const routes = Router()

//routes.get('/list', new GetItemsController().handle)

routes.route('/')
    .get(new GetItemsController().handle)
    .post(new AddItemController().handle)

routes.route('/:ml_id')
    .put(new EditItemController().handle)
    .delete(new DeleteItemController().handle)

export { routes as itemsRoutes }