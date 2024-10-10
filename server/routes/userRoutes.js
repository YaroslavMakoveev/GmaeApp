const Router = require('express');
const UserController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = new Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/auth', auth, UserController.check);

module.exports = router