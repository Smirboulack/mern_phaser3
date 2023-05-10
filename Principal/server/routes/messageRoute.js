const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

router.route('/').post(createMessage);
router.route('/').get(getMessages);

module.exports = router;