import { Router } from 'express'
import { GetItemController } from '../controllers/GetItemController'
import { ListItemsController } from '../controllers/ListItemsController'
import { AddItemController } from '../controllers/AddItemController'
import { EditItemController } from '../controllers/EditItemController'
import { DeleteItemController } from '../controllers/DeleteItemController'

const routes = Router()

//routes.get('/list', new GetItemsController().handle)

routes.route('/')
    .get(new ListItemsController().handle)
    .post(new AddItemController().handle)

routes.route('/:ml_id')
    .get(new GetItemController().handle)
    .put(new EditItemController().handle)
    .delete(new DeleteItemController().handle)

export { routes as itemsRoutes }