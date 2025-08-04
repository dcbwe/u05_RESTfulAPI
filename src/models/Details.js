const mongoose = require('mongoose');
const { dailyRoutine, trainingLevel } = require('../config/configs');

const detailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
    unique: true,
    index: true
  },
  height: {
    type: Number,
    min: [0, 'height must be ≥ 0'],
    required: [true, 'height is required']
  },
  weight: {
    type: Number,
    min: [0, 'weight must be ≥ 0'],
    required: [true, 'weight is required']
  },
  dailyRoutine: {
    type: String,
    enum: {
      values: dailyRoutine.options,
      message: 'dailyRoutine must be: ' + dailyRoutine.options.join(', ')
    },
    required: [true, 'dailyRoutine is required']
  },
  trainingLevel: {
    type: String,
    enum: {
      values: trainingLevel.options,
      message: 'training must be: ' + trainingLevel.options.join(', ')
    },
    required: [true, 'trainingLevel is required']
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

module.exports = mongoose.model('Details', detailsSchema);
