const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    trim: true,
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

/**
 * validate and register a new email for signup
 * @param {string} email
 */
userSchema.methods.registerEmail = function(email) {
  const re = /.+@.+\..+/;
  if (!re.test(email)) throw new Error('Invalid email format');
  this.email = email.toLowerCase().trim();
  return this;
};

/**
 * pseudonymize the stored email via HMAC, then clear original
 * @param {string} secret  HMAC secret from env
 */
userSchema.methods.pseudonymizeEmail = function(secret) {
  if (!this.email) return this;
  const hmac = crypto.createHmac('sha256', secret);
  const hash = hmac.update(this.email).digest('hex');
  this.email = hash;
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
