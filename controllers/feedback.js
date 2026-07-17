const IncorrectData_400 = require("../errors/400-incorrectData");
const NoDate_404 = require("../errors/404-noDate");
const NotAcceptable_406 = require("../errors/406-notAcceptable");
// const ConflictData_409 = require("../errors/409-conflictData");
const Feedback = require("../models/feedback");
const { mesErrValidationFeedback400, mesCreateFeedback, mesErrLimitFeedback400, mesErrNoFeedback404, mesErrDeleteFeedback406, mesErrIdFeedback400, mesFixFeedbackCompleted } = require("../utils/messageServer");

module.exports.getFeedbacksAdmin = (req, res, next) => {
  Feedback.find({})
    .then((feedbacks) => {
      if (feedbacks.length === 0) {
        throw new NoDate_404(mesErrNoFeedback404);
      }
      res.send(feedbacks);
    })
    .catch(next);
};

module.exports.createFeedback = (req, res, next) => {
  const { type, user, content } = req.body;
  const dateActually = Date.now();

  Feedback.findOne().sort({ date: -1 })
    .then((feedback) => {
      if (feedback && Number(dateActually) - Number(feedback?.date) <= 10000) {
        throw new IncorrectData_400(mesErrLimitFeedback400);
      }

      Feedback.create({
        type: type ? type : 'default',
        user: user === '' ? null : user,
        date: dateActually,
        content: content,
      })
        .then((feedback) => {
          res.send({message: mesCreateFeedback});
        })
        .catch((err) => {
          console.error(err.name);
          if (err.name === 'ValidationError') {
            next(new IncorrectData_400(mesErrValidationFeedback400));
            return;
          }
          // if (err.code === 11000) {
          //   next(new ConflictData_409(mesErrConflictFeedback409));
          //   return;
          // }
          next(err);
        });
    })
    .catch((err) => {
      console.error(err.name);
      next(err);
    });
};

module.exports.patchFeedbackAdmin = (req, res, next) => {
  const { type, user, content, isMainPage } = req.body;
  const { id } = req.params;

  // поиск отзыва по id
  Feedback.findById(id)
    .then((feedback) => {
      if (feedback === null) {
        throw new NoDate_404(mesErrNoFeedback404);
      }
      return feedback.updateOne(
          {
            $set: {
              type: type ? type : feedback.type,
              user: user ? user : feedback.user,
              // date: dateActually,
              content: content ? content : feedback.content,
              isMainPage: isMainPage ? isMainPage : false
            },
          },
          { new: true, runValidators: true }
        );
    })
    .then((feedbackNew) => {
      if (feedbackNew.acknowledged === true && feedbackNew.modifiedCount > 0) {
        // формирование ответа при положительном прохождении запроса
        // User.findById(req.user._id).then((user) => {
        //   if (user === null) {
        //     throw new NoDate_404(mesErrNoUser404);
        //   }
          // const groupIndex = user.education.findIndex((item) => String(item.group) === id);
          return res.send({
            message: mesFixFeedbackCompleted,
            // userGroup: user.education[groupIndex],
          });
        // });
      } else {
        // формирование ответа при отрицательном прохождении запроса
        throw new IncorrectData_400(mesErrFixUpdateFeedback404);
        // return res.send({
        //   userNew: userNew,
        //   message: mesErrFixUpdateProgrammUser404,
        //   userGroup: user.education[groupIndex],
        // });
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        next(new IncorrectData_400(mesErrIdFeedback400));
        return;
      }
      if (err.name === 'TypeError') {
        next(new NoDate_404(mesErrFixUpdateFeedback404));
        return;
      }
      if (err.name === 'ValidationError') {
        return next(new IncorrectData_400(mesErrValidationFeedback400));
      }
      next(err);
    });
};

module.exports.deleteFeedbackAdmin = (req, res, next) => {
  Feedback.findById(req.params.id)
    .then((feedback) => {
      if (feedback === null) {
        throw new NoDate_404(mesErrNoFeedback404);
      }
      // запрет удаления отзыва размещенного на главной
      if (feedback.isMainPage) {
        throw new NotAcceptable_406(mesErrDeleteFeedback406);
      }
      return feedback.remove();
    })
    .then((feedback) => res.send(feedback))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        next(new IncorrectData_400(mesErrIdFeedback400));
        return;
      }
      next(err);
    });
};
