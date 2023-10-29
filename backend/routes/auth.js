const express = require('express');
const router = express.Router();
const upload = require('../utility/multer');
const { UserRegistery, UserLogin } = require('../controllers/authContoller');

router.post('/register', upload.single("avatar"), UserRegistery);
router.post('/login', UserLogin)

module.exports = router;