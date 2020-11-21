const express = require('express');
const ChannelController = require('../controllers/channel.controller');
const router = express.Router();
const ValidateUser = require('../middlewares/validate_user.middleware')

const UserController = require('../controllers/user.controller');


//Rotas usuario
router.post('/register', UserController.create);

router.post('/authenticate', UserController.authenticate);
//Rotas CANAL
router.post('/channels', ValidateUser, ChannelController.create)
router.get('/channels/:name', ValidateUser, ChannelController.view)



module.exports = router;