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
      // assigned:{ type: Boolean, required: true },
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
  // programm: {
  //    assigned:{
  //      type: Boolean,
  //      required: true,
  //    },
  //    block1:{
  //      thema1:{
  //        timestart:{type: Number,},
  //        timeend:{type: Number,},
  //        passed:{type: Boolean}
  //      },
  //      ...
  //      test:{
  //        time:{type: Number,},
  //        passed:{type: Boolean}
  //      }
  //    },
  //    ...
  // }
});

module.exports = mongoose.model('user', userSchema);
