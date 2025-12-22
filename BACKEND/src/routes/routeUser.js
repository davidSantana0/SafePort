import homeController from "../controllers/userController.js"
import authControler from "../controllers/controller.js"
import express from 'express'

const route = express.Router()

route.post('/register', authControler.register)
route.post('/login', authControler.login)

route.get('/home/:id', homeController.home)

export default route