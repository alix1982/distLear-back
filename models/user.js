const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 3,
    // maxlength: 6,
    // select: false,
  },
  isHash: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    // required: true,
    maxlength: 100,
  },
  snils: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
    unique: true,
  },
  education: [{
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
    },
    programm: {
      type: Object,
      block:{
        thema:{
          timestart:{type: Number, required: true},
          timeend:{type: Number, required: true},
          passed:{type: Boolean, required: true}
        },
        test:{
          time:{type: Number, required: true},
          passed:{type: Boolean, required: true}
        }
      }
    }
  }]
});

module.exports = mongoose.model('user', userSchema);
