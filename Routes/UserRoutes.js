const router = require('express').Router()
const  controller = require('../Controllers/UserController')

router.get('/getUser/:id', controller.getUser);
router.post('/addUser', controller.addUser);
router.delete('/deleteUser', controller.deleteUser)


module .exports = router
