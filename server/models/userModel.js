import { randomBytes, createHash } from 'crypto';
import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

//name, email, photo, password, passwordConfirm
const userSchema = new Schema({
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
        default: 'default.jpg'
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
            message: 'Password are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });

userSchema.pre('save', function (next) {
  // Only run this function if password was actually modified
  if(!this.isModified('password') || this.isNew) return next();
  
  

  // Delete passwordConfirm field
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
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

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = randomBytes(32).toString('hex');  

  this.passwordResetToken = createHash('sha256')
  .update(resetToken)
  .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model('User', userSchema);

export default User;