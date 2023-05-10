const express = require('express');

const {
  createUser,
  authUser,
  updateUserPassword,
  updateUserEmail,
  updateUsername,
  deleteUser,
  getUsers,
} = require('../controllers/userController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getUsers);
router.route('/').post(createUser); 
router.post('/signUp', authUser);
router.put('/updatePassword', updateUserPassword);
router.put('/updateEmail', updateUserEmail);
router.put('/updateUsername', updateUsername);
router.delete('/delete', deleteUser); 

module.exports = router;
