const mongoose = require('mongoose');
const { language, units } = require('../config/configs');

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
    unique: true,
    index: true
  },
  language: {
    type: String,
    enum: {
      values: language.options,
      message: 'language must be: ' + language.options.join(', ')
    },
    default: 'en',
    required: [true, 'language is required']
  },
  units: {
    type: String,
    enum: {
      values: units.options,
      message: 'units must be: ' + units.options.join(', ')
    },
    default: 'normal',
    required: [true, 'units is required']
  },
  darkMode: {
    type: Boolean,
    default: false,
    required: [true, 'darkMode is required']
  },
  notifications: {
    email: {
      type: Boolean,
      default: true,
      required: [true, 'notifications.email is required']
    },
    sms: {
      type: Boolean,
      default: false,
      required: [true, 'notifications.sms is required']
    }
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

module.exports = mongoose.model('Settings', settingsSchema);
