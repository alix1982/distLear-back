const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NoAuthErr_401 = require('../errors/401-noAuthErr');
const { mesErrLogin401, mesErrLoginSnils401, mesLoginAdmin, mesLoginUser } = require('../utils/messageServer');
const { NODE_ENV, JWT_SECRET_USER, JWT_SECRET_ADMIN, NAME_ADMIN, PASSWORD_ADMIN } = process.env;

module.exports.login = (req, res, next) => {
  const { name, password, snils } = req.body;

  if (name === NAME_ADMIN) {
    bcrypt.compare(password, PASSWORD_ADMIN)
      .then((matched) => {
        if (!matched) {
          throw new NoAuthErr_401(mesErrLogin401);
        } else {
          const token = jwt.sign({ name: NAME_ADMIN }, JWT_SECRET_ADMIN, { expiresIn: '7d' });
          return res.send({ token, message: mesLoginAdmin });
        }
      })
      .catch(next);
  } else {
    User.findOne({ snils })
      .then((user) => {
        if (user === null) {
          throw new NoAuthErr_401(mesErrLoginSnils401);
        }
        if (name === user.name && password === user.password) {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET_USER, { expiresIn: '7d' });
          return res.send({ token, message: mesLoginUser });
        } else {
          throw new NoAuthErr_401(mesErrLogin401);
        }
      })
      .catch(next);
  }
};

// module.exports.createPasswordAdmin = (req, res, next) => {
//   console.log("нужен пароль");
//   res.send("нужен пароль");
// };

module.exports.createPasswordAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      console.log('ok');
      const passwordRes = {
        password: req.body.password,
        hash: hash,
      };
      res.send(passwordRes);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// module.exports.createUser = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10)
//     .then((hash) => User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: hash,
//     }))
//     .then((user) => {
//       const userRes = {
//         name: user.name,
//         email: user.email,
//       };
//       res.send(userRes);
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err.name === 'ValidationError') {
//         next(new IncorrectData_400(mesErrValidation400));
//         return;
//       }
//       if (err.code === 11000) {
//         next(new ConflictData_409(mesErrConflictUser409));
//         return;
//       }
//       next(err);
//     });
// };

// module.exports.login = (req, res, next) => {
//   const { name, password } = req.body;
//   const { NODE_ENV, JWT_SECRET } = process.env;
//   User.findOne({ name }).select('+password')
//     .then((user) => {
//       if (user === null) {
//         throw new NoAuthErr_401(mesErrLogin401);
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             throw new NoAuthErr_401(mesErrLogin401);
//           }
//           const token = jwt.sign(
//             { _id: user._id },
//             NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
//             { expiresIn: '7d' },
//           );
//           // const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
//           res.send({ token, message: mesLogin });
//         });
//     })
//     .catch(next);
// };
