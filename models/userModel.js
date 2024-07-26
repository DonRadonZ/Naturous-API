const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email must be required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        // required: [true, "photo must be required"],
        // unique: true
    },
    password: {
        type: String,
        required: [true, "password must be required"],
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(el){
                // This only works on CREATE and SAVE!!!
                return el === this.password;
            },
            message: 'Password are not the same'
        }
    }
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if(this.isModified('password')) return next();
  
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;