const IncorrectData_400 = require('../errors/400-incorrectData');
const NoDate_404 = require('../errors/404-noDate');
const NotAcceptable_406 = require('../errors/406-notAcceptable');
const ConflictData_409 = require('../errors/409-conflictData');
const Programm = require('../models/programm');
const Group = require('../models/group');

const {
  mesErrValidationGroup400,
  mesErrConflictGroup409,
  mesErrNoGroup404,
  mesErrDeleteGroup406,
  mesErrIdGroup400,
  mesErrValidationProgramm400,
  mesErrConflictProgramm409,
  mesErrNoProgramm404,
  mesErrIdProgramm400,
} = require('../utils/messageServer');

module.exports.getGroups = (req, res, next) => {
  Group.find({})
    .then((groups) => {
      if (groups.length === 0) {
        throw new NoDate_404(mesErrNoGroup404);
      }
      res.send(groups);
    })
    .catch(next);
};

module.exports.createGroup = (req, res, next) => {

  const { name, dateStart, dateEnd, programmName } = req.body;

  Programm.findOneAndUpdate({name: programmName}, {applies: true}, { new: true, runValidators: true })
    .then((prog)=>{
      Group.create({
      name,
      assigned: false,
      dateStart,
      dateEnd,
      programm: prog,
      })
        .then((group) => {
          res.send(group);
        })
        .catch((err) => {
          console.log(err.name);

          if (err.name === 'ValidationError') {
            next(new IncorrectData_400(mesErrValidationGroup400));
            return;
          }
          if (err.code === 11000) {
            next(new ConflictData_409(mesErrConflictGroup409));
            return;
          }
          next(err);
        });
    })
};

module.exports.deleteGroup = (req, res, next) => {
  Group.findById(req.params._id)
    .then((group) => {
      if (group === null) {
        throw new NoDate_404(mesErrNoGroup404);
      }
      if (group.assigned) {
        throw new NotAcceptable_406(mesErrDeleteGroup406);
      }

      return group.remove();
      // return group
    })
    .then((group) => {
      Group.find({})
        .then((groups)=>{
          if (groups.length === 0) {
            throw new NoDate_404(mesErrNoGroup404);
          }
          let groupsProgramm = [];
          // console.log(group.programm)
          groups.map((groupProgramm) =>
            (String(groupProgramm.programm) === String(group.programm)) && (groupsProgramm = [...groupsProgramm, groupProgramm])
          );
          if (groupsProgramm.length <= 0) {
            // изменение статуса applies у программы если она никому не назначена
            Programm.findByIdAndUpdate(group.programm, {applies: false}, { new: true, runValidators: true })
              .then((programm)=>{
                res.send(group);
              })
              .catch((err) => {
                console.log(err.name);
                if (err.name === 'TypeError') {
                  next(new NoDate_404(mesErrNoProgramm404));
                  return;
                };
                if (err.name === 'CastError') {
                  next(new IncorrectData_400(mesErrIdProgramm400));
                  return;
                }
                if (err.name === 'ValidationError') {
                  next(new IncorrectData_400(mesErrValidationProgramm400));
                  return;
                }
                if (err.code === 11000) {
                  next(new ConflictData_409(mesErrConflictProgramm409));
                  return;
                }
                next(err);
              });
          } else {
            res.send(group);
          }
        })
        .catch((err) => {
          console.log(err.name);
          next(err);
        });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        next(new IncorrectData_400(mesErrIdGroup400));
        return;
      }
      next(err);
    });
};
