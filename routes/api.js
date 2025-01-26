const router = require('express').Router();
const auth = require('../middlewares/auth');
const apiController = require('../controllers/apicontroller');
const { route } = require('./auth');


router.get('/characters', auth, apiController.getAllCharacters);
router.get('/characters/:name', auth, apiController.getCharacterByName);


module.exports = router;