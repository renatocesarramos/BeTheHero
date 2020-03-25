const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.route('/ongs')
  .post(OngController.create)
  .get(OngController.index)

routes.route('/incidents')
  .post(IncidentsController.create)
  .get(IncidentsController.index)

routes.delete('/incidents/:id', IncidentsController.delete)
routes.get('/profile', ProfileController.index)

module.exports = routes