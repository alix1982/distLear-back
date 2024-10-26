const mongoose = require('mongoose');
const validator = require('validator');

const questionnaireSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  patronymic: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  workName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    validate: validator.isEmail,
    required: true,
  },
  phone: {
    type: String,
    validate: validator.isMobilePhone,
    required: true,
  },
  postWork: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  postGoAndChs: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  yearPreviousQualification: {
    type: Number,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  education: {
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
  citizenship: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  isModeration: {
    type: Boolean,
    required: true,
  },
  consentProcessingPersonalData: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('questionnaire', questionnaireSchema);
