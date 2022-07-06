require('dotenv').config();
module.exports = {
  allowedOrigins: ['mongodb+srv://krishna_sahu:Krishna123@cluster0.q3wgnwb.mongodb.net/?retryWrites=true&w=majority'],
  SERVER_PORT: process.env.PORT || 3000,
  SERVER_DB_URI: process.env.MONGODB_URL_LOCAL,
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 10,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
   host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
     user: "krishnasahu0201@gmail.com",
      pass: "fvlfywmlyvqdykbr",
    },
  },
  
   
};