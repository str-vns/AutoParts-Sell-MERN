const User = require("../models/user");
const sendToken = require("../utility/jwtToken");
const sendEmail = require("../utility/sendEmail");
const crypto = require("crypto");
const bcrypt = require('bcrypt')
const cloudinary = require("cloudinary");
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const client = new OAuth2('1050826465955-mpgi9kopddpq75bacchdjkaeahbqr58e.apps.googleusercontent.com')



  exports.registerUser = async (req, res, next) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Missing required parameter - file' });
        }

        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        });

        const { name, email, password, role } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            avatar:  result ?  {
                public_id: result.public_id,
                url: result.secure_url
            } : {
                public_id: 'default',
                url: '/images/default_avatar.jpg'
            },
            // role,
        });

        sendToken(user, 200, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

exports.UserLogin =  async (req, res, next ) =>
{
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter email & password' })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }
  
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }
   
    sendToken(user, 200, res)
    

    
}

exports.UserLogout =  async (req, res, next ) =>
{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
}

exports.forgotPassword = async (req, res, next) => {
    let user; 
    try {
        user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found with this email' });
        }


        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `https://localhost:5173/password/reset/${resetToken}`;
        const message = `<section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <header>
           <h1> ONGarage </h1>     
        </header>
    
        <main class="mt-8">
            <h4 class="text-gray-700 dark:text-gray-200">Hi \n\n${user.name}\n\n,</h4>
    
            <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                This message Enable you to create New Password In <span class="font-semibold ">OnGarage</span>.
            </p>
            

               <a href="${resetUrl}" class="button px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white"> New Password</a>
            
            <p class="mt-8 text-gray-600 dark:text-gray-300">
                Thanks, <br>
                OnGarage
            </p>
        </main>
        
    
        
    </section>`;

        await sendEmail({
            email: user.email,
            subject: 'OnGarage Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `This Email sent to: ${user.email}`
        });
    } catch (error) {

        console.error(error); 

        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};




exports.resetPassword = async (req, res, next) => {
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has been expired' })
        // return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Password does not match' })
        // return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
}

exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('password');
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return res.status(400).json({ message: 'Old password is incorrect' })
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res)

}

exports.UserProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
}

exports.updateProfile = async (req, res, next) => {

    try {
        if (req.body.avatar && req.body.avatar !== '') {
            const user = await User.findById(req.user.id);
            const image_id = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(image_id);
            
        }
    
        const results = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        });
    
        const { name } = req.body;
        
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            avatar: {
                public_id: results.public_id,
                url: results.secure_url
            },
        }, {
            new: true, 
            runValidators: true,
        });

    
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            success: false,
            error: 'An error occurred while updating the profile.',
        });
    }
   
}

exports.allUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
}

exports.allUsers  = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({ message: `User does not found with id: ${req.params.id}` })
    }

    res.status(200).json({
        success: true,
        user
    })
}

exports.getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({ message: `User does not found with id: ${req.params.id}` })
    }

    res.status(200).json({
        success: true,
        user
    })
}

const createRefreshToken = (payload) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET is not defined');
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;

        const verify = await client.verifyIdToken({ idToken: tokenId, audience:"1050826465955-mpgi9kopddpq75bacchdjkaeahbqr58e.apps.googleusercontent.com" });

        const { email_verified, email, name, picture } = verify.payload;

        if (!email_verified) return res.status(400).json({ msg: "Email verification failed." });

        let user = await User.findOne({ email });

        if (!user) {
            const passwordHash = await bcrypt.hash(email, 12);

            const newUser = new User({
                name,
                email,
                password: passwordHash,
                avatar: {
                    public_id: 'default',
                    url: picture
                }
            });

            await newUser.save();

            user = newUser;
        }

        sendToken(user, 200, res);
    } catch (err) {
        console.error(err);
        if (err.response) {
            console.error('Response data:', err.response.data);
            console.error('Response status:', err.response.status);
        }
        return res.status(500).json({ msg: err.message });
    }
};

exports.facebookLogin = async (req, res) => {
    try {
        const { accessToken, userID } = req.body;
        

        const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
        

        const response = await fetch(URL);


        if (!response.ok) {
            throw new Error(`Failed to fetch data from Facebook: ${response.statusText}`);
        }


        const data = await response.json();
        
        const { email, name, picture } = data;


        let user = await User.findOne({ email });

        if (user) {
            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie('refreshtoken', refresh_token, {
              httpOnly: true,
              path: '/user/refresh_token',
              maxAge: 7 * 24 * 60 * 60 * 1000
            });
          
            res.json({ msg: "Login success!", user }); 
        } else {

            const passwordHash = await bcrypt.hash(email, 12);


            const newUser = new User({
                name,
                email,
                password: passwordHash,
                avatar: {
                    public_id: 'default',
                    url: picture.data.url
                }
            });


            await newUser.save();

            user = newUser;

            const refresh_token = createRefreshToken({ id: newUser._id });
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ msg: "Login success!", user: newUser });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};