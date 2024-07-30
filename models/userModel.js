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
    role:{
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "password must be required"],
        minLength: 8,
        select: false
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
    },
    passwordChangedAt: Date
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

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
       const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 
       10
    ); 

    return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;