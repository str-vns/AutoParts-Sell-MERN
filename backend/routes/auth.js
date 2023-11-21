const express = require('express');
const router = express.Router();
const upload = require('../utility/multer');
const { registerUser, UserLogin, UserLogout, allUsers, getUserDetails, UserProfile, updatePassword, resetPassword, forgotPassword, updateProfile, googleLogin, facebookLogin, removeUser, updateUser } = require('../controllers/authContoller');
const { isAuthenticatedUser } = require('../middlewares/auth');

//user


router.post('/register', upload.single("avatar"), registerUser);
router.post('/google_login', googleLogin)
router.post('/facebook_login', facebookLogin)
router.post('/login', UserLogin)
router.get('/logout', UserLogout)
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.put('/password/update', isAuthenticatedUser, updatePassword)
router.get('/profile', isAuthenticatedUser, UserProfile)
router.put('/profile/update', isAuthenticatedUser,upload.single("avatar"), updateProfile)

//admin
router.get('/admin/users',  allUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, getUserDetails ).delete(isAuthenticatedUser, removeUser).put(isAuthenticatedUser, updateUser)


module.exports = router;