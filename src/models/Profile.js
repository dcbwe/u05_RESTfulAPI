const mongoose   = require('mongoose');
const { gender } = require('../config/configs');
const currentYear = new Date().getFullYear();

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  firstname: {
    type: String,
    trim: true,
    required: [true, 'firstname is required']
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, 'lastname is required']
  },
  birthYear: {
    type: Number,
    min: [1900, 'year ≥ 1900'],
    max: [currentYear, `year cant be > ${currentYear}`],
    required: [true, 'birthyear is required']
  },
  gender: {
    type: String,
    enum: {
      values: gender.options,
      message: 'gender must be: ' + gender.options.join(', ')
    },
    required: [true, 'gender is required']
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'city is required']
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'country is required']
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  toObject: { virtuals: true }
});

profileSchema.virtual('fullName')
  .get(function() {
    return `${this.firstname} ${this.lastname}`;
  }
);

profileSchema.virtual('age')
  .get(function() {
    return currentYear - this.birthYear;
  }
);

module.exports = mongoose.model('Profile', profileSchema);
