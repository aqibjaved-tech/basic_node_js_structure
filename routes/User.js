const express = require('express');

const User = require('../controllers/User');
const router = express.Router();

router.post('/api/user/create', User.create);

router.post('/api/user/update', User.update);

router.get('/api/user/delete', User.delete);

router.get('/api/user', User.findOneByEmail);

router.get('/api/users', User.findAll);

module.exports = router;