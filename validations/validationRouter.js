const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { mesErrCelebratePhone400 } = require('../utils/messageServer');

module.exports.validationRouterLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(1).max(6),
    snils: Joi.string().min(11).max(11),
  }),
});

module.exports.validationRouterCreateQuestionnaireUser = celebrate({
  body: Joi.object().keys({
    emailRequst: Joi.string().email().required(),
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(30),
    patronymic: Joi.string().required().min(2).max(30),
    workName: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    phone: Joi.string().required().custom((values, helpers) => {
      if (validator.isMobilePhone(values)) { return values; }
      return helpers.message(mesErrCelebratePhone400);
    }),
    postWork: Joi.string().required().min(2).max(30),
    postGoAndChs: Joi.string().required().min(2).max(30),
    yearPreviousQualification: Joi.number().required().min(1950).max(2100),
    education: Joi.string().required().min(2).max(30),
    snils: Joi.string().required().min(11).max(11),
    citizenship: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validationRouterQuestion = celebrate({
  body: Joi.object().keys({
    emailRequst: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    phone: Joi.string().required().custom((values, helpers) => {
      if (validator.isMobilePhone(values)) { return values; }
      return helpers.message(mesErrCelebratePhone400);
    }),
    question: Joi.string().required().min(2).max(1000),
  }),
});

module.exports.validationRouterCreateQuestionnaireAdmin = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().required().min(2).max(30),
    lastName: Joi.string().required().min(2).max(30),
    patronymic: Joi.string().required().min(2).max(30),
    workName: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
    phone: Joi.string().required().custom((values, helpers) => {
      if (validator.isMobilePhone(values)) { return values; }
      return helpers.message(mesErrCelebratePhone400);
    }),
    postWork: Joi.string().required().min(2).max(30),
    postGoAndChs: Joi.string().required().min(2).max(30),
    yearPreviousQualification: Joi.number().required().min(1950).max(2100),
    education: Joi.string().required().min(2).max(30),
    snils: Joi.string().required().min(11).max(11),
    citizenship: Joi.string().required().min(2).max(30),
    // isModeration: Joi.boolean().required().default(false),
  }),
});

module.exports.validationRouterFixQuestionnaireAdmin = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    patronymic: Joi.string().min(2).max(30),
    workName: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    phone: Joi.string().custom((values, helpers) => {
      if (validator.isMobilePhone(values)) { return values; }
      return helpers.message(mesErrCelebratePhone400);
    }),
    postWork: Joi.string().min(2).max(30),
    postGoAndChs: Joi.string().min(2).max(30),
    yearPreviousQualification: Joi.number().min(1950).max(2100),
    education: Joi.string().min(2).max(30),
    snils: Joi.string().min(11).max(11),
    citizenship: Joi.string().min(2).max(30),
  }),
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationRouterFixModerationQuestionnaireAdmin = celebrate({
  body: Joi.object().keys({
    isModeration: Joi.boolean().required(),
  }),
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationRouterDeleteQuestionnaireAdmin = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationRouterCreateUserAdmin = celebrate({
  body: Joi.object().keys({
    snils: Joi.string().min(11).max(11),
  }),
});

module.exports.validationRouterUpdateUserAdmin = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
  body: Joi.object().keys({
    programm1: {
      assigned: Joi.boolean().required(),
      block1:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      },
      block2:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      },
      block3:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      }
    },
    programm2: {
      assigned: Joi.boolean().required(),
      block1:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      },
      block2:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      },
      block3:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      }
    },
    programm3: {
      assigned: Joi.boolean().required(),
      block1:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      },
      block2:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      },
      block3:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed: Joi.boolean(),
        },
      }
    },
  }),
});

module.exports.validationRouterDeleteUserAdmin = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationRouterAddGroupUserAdmin = celebrate({
  body: Joi.object().keys({
    groupName: Joi.string().min(2).max(50).required(),
  }),
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationRouterDeleteGroupUserAdmin = celebrate({
  body: Joi.object().keys({
    groupId: Joi.string().required().hex().length(24),
  }),
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationRouterUpdateProgramm = celebrate({
  params: Joi.object().keys({
    id: Joi.string().min(1).max(1),
  }),
  body: Joi.object().keys({
    programm: {
      assigned: Joi.boolean().required(),
      block1:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed:Joi.boolean(),
        }
      },
      block2:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed:Joi.boolean(),
        }
      },
      block3:{
        thema1:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema2:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        thema3:{
          timestart: Joi.number(),
          timeend: Joi.number(),
          passed: Joi.boolean(),
        },
        test:{
          time:Joi.number(),
          passed:Joi.boolean(),
        }
      }
    },
  }),
});

module.exports.validationRouterCreateProgramm = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(50),
    blockCount: Joi.number().required().min(1).max(10),
    themaCount: Joi.array().items(Joi.number()).required(),
  }),
});

module.exports.validationRouterDeleteProgramm = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.validationRouterCreateGroup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(50),
    dateStart: Joi.date().timestamp('unix'),
    dateEnd: Joi.date().timestamp('unix'),
    programmName: Joi.string().required().min(2).max(50),
  }),
});

module.exports.validationRouterDeleteGroup = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

// module.exports.validationRouterCreateMovie = celebrate({
//   body: Joi.object().keys({
//     trailerLink: Joi.string().required().custom((values, helpers) => {
//       if (validator.isURL(values)) { return values; }
//       return helpers.message(mesErrCelebrateTrailerLink400);
//     }),
//   }),
// });
