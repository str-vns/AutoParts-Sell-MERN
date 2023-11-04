const express = require('express');
const passport = require('passport')
const router = express.Router();
const upload = require('../utility/multer');
const { registerUser, UserLogin, UserLogout, allUsers, getUserDetails, getUserProfile, updatePassword, resetPassword, forgotPassword, updateProfile } = require('../controllers/authContoller');

//user


router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', UserLogin)
router.get('/logout', UserLogout)
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.put('/password/update',  updatePassword)
router.get('/profile',  getUserProfile)
router.put('/profile/update', updateProfile)

//admin
router.get('/admin/users',  allUsers)
router.get('/admin/user/:id',getUserDetails )
module.exports = router;