const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'must be valid email']
  },
  password: {
    type: String,
    required: [function() {return this.verified; }, 'password is required once verified'],
    minlength: [8, 'password must be atleast 8 chars'],
  },
  active: {
    type: Boolean,
    default: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpires: {
    type: Date
  }
}, {
  timestamps: true
});

// token lookup and expiry check
userSchema.index({ verificationToken: 1, verificationTokenExpires: 1 });

// set verification token
userSchema.methods.setVerificationToken = function(token, expiresAt) {
  this.verificationToken = token;
  this.verificationTokenExpires = expiresAt;
  return this;
};

// clear token on verify
userSchema.methods.markVerified = function() {
  this.verified = true;
  this.verificationToken = undefined;
  this.verificationTokenExpires = undefined;
  return this;
};

userSchema.set('toJSON', {
  virtuals:     true,
  versionKey:   false,
  transform:    (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.verificationToken;
    delete ret.verificationTokenExpires;
  }
});


module.exports = mongoose.model('User', userSchema);
