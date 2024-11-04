const Questionnaire = require('../models/questionnaire');
const IncorrectData_400 = require('../errors/400-incorrectData');

const { mesErrNoEmailSending400, mesQuestion, mesErrEmailSending400, mesQuestionAndEmail, mesErrNoQuestion } = require('../utils/messageServer');

const createQuestionnaire = require('../utils/createQuestionnaire');
const sendEmail = require('../utils/sendEmail');

module.exports.createQuestionnaireUser = async (req, res, next) => {
  try {
    const {
      emailRequst,
      firstName, lastName, patronymic, workName, email, phone,
      postWork, postGoAndChs, yearPreviousQualification,
      education, snils, citizenship, consentProcessingPersonalData
    } = req.body;

    // if (!emailRequst) {
    //   return res.status(400).json({ message: 'Email is required.' });
    // }

    // готовим данные для отправки на почту
    const options = {
      to: emailRequst,
      subject: 'Новая анкета',
      html:
        `
        <h1>Фамилия: ${firstName}</h1>
        <p>Имя: ${lastName}</p>
        <p>Отчество: ${patronymic}</p>
        <p>Место работы: ${workName}</p>
        <p>Почта: ${email}</p>
        <p>Телефон: ${phone}</p>
        <p>Должность: ${postWork}</p>
        <p>Должность по ГОиЧС: ${postGoAndChs}</p>
        <p>Год прошлого обучения: ${yearPreviousQualification}</p>
        <p>Образование: ${education}</p>
        <p>СНИЛС: ${snils}</p>
        <p>Гражданство: ${citizenship}</p>
        <p>Согласие на обработку персональных данных: ${consentProcessingPersonalData ? 'Есть' : 'Нет'}</p>
        `,
    };

    // добавляем пользователя в базу
    createQuestionnaire(req, res, next);

    // отправляем данные на почту, если такого снилса нет в базе
    Questionnaire.find({ snils: snils })
      .then(async (questionnaire)=>{
        if (questionnaire.length === 0) {
          try {
            await sendEmail(options);
            res.send({...questionnaire, message: mesQuestionAndEmail});
            // res.send({ message: mesQuestion })
          } catch (err) {
            console.log(err);
            res.send({...questionnaire, message: mesErrEmailSending400});
            // next(new IncorrectData_400(mesErrEmailSending400));
          }
        }
      })

    // res.status(200).json({
    //   message: 'Check your mail!',
    // });

  } catch (err) {
    console.log(err);
    if (err.message === 'No recipients defined') {
      next(new IncorrectData_400(mesErrNoEmailSending400));
      return (err);
    }
    return next(err);
  }
};

module.exports.createQuestion = async (req, res, next) => {
  try {
    const { emailRequst, name, phone, email, question } = req.body;

    // готовим данные для отправки на почту
    const options = {
      to: emailRequst,
      subject: 'Вопрос',
      html: `
        <h1>Имя: ${name}</h1>
        <p>Телефон: ${phone}</p>
        <p>Почта: ${email}</p>
        <p>Вопрос: ${question}</p>
      `,};
    // отправляем данные на почту
    try {
      await sendEmail(options);
      res.send({ message: mesQuestion })
    } catch (err) {
      console.log(err);
      next(new IncorrectData_400(mesErrEmailSending400));
    }
    // res.status(200).json({
    //   message: 'Check your mail!',
    // });

  } catch (err) {
    console.log(err);
    if (err.message === 'No recipients defined') {
      next(new IncorrectData_400(mesErrNoEmailSending400));
      return (err);
    }
    return next(err);
  }
};