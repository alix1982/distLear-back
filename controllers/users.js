const IncorrectData_400 = require('../errors/400-incorrectData');
const NoDate_404 = require('../errors/404-noDate');
const Group = require('../models/group');
const Questionnaire = require('../models/questionnaire');
const User = require('../models/user');
const { mesErrNoUser404, mesErrNoQuestionnaire404, mesAddProgrammUserCompleted, mesAddProgrammUserCancelled, mesErrIdUser400, mesErrValidationUser400, mesErrIdProgramm400, mesErrNoGroup404 } = require('../utils/messageServer');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NoDate_404(mesErrNoUser404);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getDataMe = (req, res, next) => {
  let userData = {};
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NoDate_404(mesErrNoUser404);
      }
      return user;
    })
    .then((user)=> {
      Questionnaire.find( { snils: user.snils } )
        .then((questionnaire)=> {
          if (questionnaire === null) {
            throw new NoDate_404(mesErrNoQuestionnaire404);
          }
          userData = {user: user, questionnaire: questionnaire[0]}
          res.send(userData);
        })
    })
    .catch(next);
};

module.exports.getUserGroup = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new NoDate_404(mesErrNoUser404);
      }
      let groupsUser = [];
      user.education.map((item)=>
        groupsUser = [...groupsUser, String(item.group)]
      );
      Group.find({ _id: {$in : groupsUser}})
        .then((groups) => {
          // console.log(groups);
          // проверить ошибку
          if (groups === null) {
            throw new NoDate_404(mesErrNoGroup404);
          }
          res.send(groups);
        })
        .catch((err) => {
          console.log(err.name);
          if (err.name === 'CastError') {
            next(new IncorrectData_400(mesErrIdUser400));
            return;
          }
          if (err.name === 'TypeError') {
            next(new NoDate_404(mesErrNoGroup404));
            return;
          };
          if (err.name === 'ValidationError') {
            return next(new IncorrectData_400(mesErrValidationUser400));
          }
          next(err);
        });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        next(new IncorrectData_400(mesErrIdUser400));
        return;
      }
      if (err.name === 'TypeError') {
        next(new NoDate_404(mesErrNoGroup404));
        return;
      };
      if (err.name === 'ValidationError') {
        return next(new IncorrectData_400(mesErrValidationUser400));
      }
      next(err);
    });
    // .catch(next);
};

module.exports.patchUserProgramm = (req, res, next) => {
  const { thema, block, keyChange } = req.body;
  const { id } = req.params;
  User.findById(req.user._id)
    .then((user) => {
      const groupIndex = user.education.findIndex((item)=> String(item.group) === id);
      if (groupIndex < 0) {
        throw new NoDate_404(mesErrNoGroup404);
      }

      const groupId = user.education.find((item)=> String(item.group) === id).group;
      const time = new Date().getTime();
      // const educationUser = user.education[groupIndex].programm;
      const educationUserBlocks = user.education[groupIndex].programm.blocks;

      // if (user === null) {
      //   throw new NoDate_404(mesErrNoUser404);
      // }
      if (keyChange === 'start') {
        educationUserBlocks[`block${block}`][`thema${thema}`].timestart = time

        return user.updateOne(
          {$set: { "education.$[idGroup].programm.blocks": educationUserBlocks }},
          { new: true, runValidators: true, arrayFilters: [ { "idGroup.group": { $eq: groupId } } ] }
        );

      } else if (keyChange === 'end') {
        educationUserBlocks[`block${block}`][`thema${thema}`].timeend = time;
        educationUserBlocks[`block${block}`][`thema${thema}`].passed = true;

        return user.updateOne(
          {$set: { "education.$[idGroup].programm.blocks": educationUserBlocks }},
          { new: true, runValidators: true, arrayFilters: [ { "idGroup.group": { $eq: groupId } } ] }
        );
      } else if (keyChange === 'testBlock') {
        // console.log('testBlock');
        educationUserBlocks[`block${block}`].test.passed = true;
        educationUserBlocks[`block${block}`].test.time = time;

        return user.updateOne(
          {$set: { "education.$[idGroup].programm.blocks": educationUserBlocks }},
          { new: true, runValidators: true, arrayFilters: [ { "idGroup.group": { $eq: groupId } } ] }
        );
      } else if (keyChange === 'testStart') {
        // console.log('testStart');
        // educationUser.startTest.passed = true;
        // educationUser.startTest.time = time;

        return user.updateOne(
          {$set: {
            "education.$[idGroup].programm.startTest.passed": true,
            "education.$[idGroup].programm.startTest.time": time,

           }},
          { new: true, runValidators: true, arrayFilters: [ { "idGroup.group": { $eq: groupId } } ] }
        );
      } else if (keyChange === 'testFinally') {
        // console.log('testFinally');
        // educationUser.startTest.passed = true;
        // educationUser.startTest.time = time;

        return user.updateOne(
          {$set: {
            "education.$[idGroup].programm.finallyTest.passed": true,
            "education.$[idGroup].programm.finallyTest.time": time,

           }},
          { new: true, runValidators: true, arrayFilters: [ { "idGroup.group": { $eq: groupId } } ] }
        );
      } else {
        // if (user === null) {
        //   throw new NoDate_404(mesErrNoUser404);
        // }
      }
    })
    .then((userNew) => {
      if (userNew.acknowledged === true) {
        User.findById(req.user._id)
          .then((user)=>{
            const groupIndex = user.education.findIndex((item)=> String(item.group) === id)
            return res.send({
              message: mesAddProgrammUserCompleted, userGroup: user.education[groupIndex]
            })
        })
      } else {
        return res.send(userNew)
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        next(new IncorrectData_400(mesErrIdUser400));
        return;
      }
      if (err.name === 'TypeError') {
        next(new NoDate_404(mesErrNoGroup404));
        return;
      };
      if (err.name === 'ValidationError') {
        return next(new IncorrectData_400(mesErrValidationUser400));
      }
      next(err);
    });
};