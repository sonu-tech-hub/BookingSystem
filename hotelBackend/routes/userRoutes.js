// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

const { registerUser, authUser ,getAllUsers,updateUser,deleteUser} = require('../controllers/userController');

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/').get(protect,admin,getAllUsers);
router.route('/:id').put(protect,admin,updateUser);
router.route('/:id').delete(protect,admin,deleteUser);


module.exports = router;