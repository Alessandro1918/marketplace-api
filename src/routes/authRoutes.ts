import { Router } from 'express'
import { AuthenticateUserController } from '../controllers/AuthenticateUserController'

const routes = Router()

//Get Mercado Livre (ML) access_token:
//from 1:
//https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI
//to 2:
//https://REDIRECT_URI/?code=TG-61ab664123507f0...
//to 3:
//{"access_token": "APP_USR-8565598613236342c542...", ...}

//dev: Go to page localhost/ml
//dev api: REDIRECT_URI = localhost:2000
//dev web: REDIRECT_URI = localhost:3001
//prod: User will go the frontend's home (REDIRECT_URI), which will have a tag like: <a href={apiUrl/ml}>Login no ML</a>
routes.get('/', (req, res) => {
    const CLIENT_ID = process.env.CLIENT_ID
    const REDIRECT_URI = process.env.NODE_ENV === 'dev' 
        ? process.env.REDIRECT_URI_DEV 
        : process.env.REDIRECT_URI
    res.redirect(`https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`)
})

//ML redirect will send to 2 (REDIRECT_URI/?code=...)

//dev: use Insomnia to make a POST with the code in the request's body
//prod: The frontend's homepage will reload @ callback, 
//check for the code in the url, split the code out from the url, 
//and make the API call to change that code for the accessToken
routes.post('/auth', new AuthenticateUserController().handle)

export { routes as authRoutes }