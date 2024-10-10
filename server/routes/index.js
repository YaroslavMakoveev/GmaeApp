const Router = require('express');
const UserRoutes = require('../routes/UserRoutes');

const router = new Router();

router.use('/user', UserRoutes);

module.exports = router