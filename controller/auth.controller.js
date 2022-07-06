const { encrypt, compare } = require('../services/crypto');
const { generateOTP } = require('../services/OTP');
const { sendMail } = require('../services/MAIL');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateJwt=require('../services/JWT')
const generateQRcode=require('../controllers/2faGoogle')
const qrcode = require('qrcode')
const speakeasy = require('speakeasy')

exports.signUpUser = async (req, res) => {
  const { email, password } = req.body;
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }
  // create new user
  const newUser = await createUser(email, password);
  if (!newUser[0]) {
    return res.status(400).send({
      message: 'Unable to create new user',
    });
  }
  res.send(newUser);
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email })
  const isValid = await bcrypt.compare(password, user.password);
  console.log(isValid);

  if (!isValid ) {
    return res.status(400).json({
      statuscode: 400,
      status: 'Failed',
      message: "Invalid Credentials ",
      data: {}
    });

  }
  
 const token= await generateJwt.signToken(email);
  return res.status(200).json({
    statuscode: 200,

    status: 'Ok',
    message: "Login Successfully",
    data: {
      Token:token
    }

  
})
}


exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

const createUser = async (email, password) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    email: email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return [false, 'Unable to sign you up'];
  }
  try {
    await sendMail(
      email,
      otpGenerated,
    );
    return [true, newUser];
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, 'User not found'];
  }
  if (user && user.otp !== otp) {
    return [false, 'Invalid OTP'];
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $set: { active: true },
  });
  return [true, updatedUser];
};