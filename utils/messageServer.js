module.exports = {
  // mesErrDeleteMovie403: 'Удаление не своей карточки',

  // общие ошибки сервера
  mesErr500: 'На сервере произошла ошибка',
  mesErrRouterErrors404: 'Не верный путь',

  //валидация роута анкет
  mesErrCelebratePhone400: 'Телефон не корректен',
  mesErrNoEmailSending400: 'Нет почты для отправки анкеты',
  mesErrConflictQuestionnaire409: 'Анкета с таким снилсом уже существует',
  mesErrValidationQuestionnaire400: 'Ошибка валидации модели анкеты',

  // валидация роута анкет админа
  mesErrIdQuestionnaire400: 'Некорректный id анкеты',
  mesErrNoQuestionnaire404: 'Анкета не найдена',
  mesFixQuestionnaire: 'Анкета изменена',
  mesModerationQuestionnaireCompleted: 'Модерация анкеты пройдена',
  mesModerationQuestionnaireCancelled: 'Модерация анкеты отменена',

  //валидация роута авторизации
  mesErrLogin401: 'Пользователь с таким логином и паролем не найден',
  mesErrLoginSnils401: 'Неправильный снилс',
  mesLoginUser: 'Всё верно!',
  mesLoginAdmin: 'That right!',

  //валидация авторизации
  mesErrAuth401: 'Необходима авторизация',

  //валидация роута пользователей админа
  mesErrNoUser404: 'Пользователь не найден',
  mesErrValidationUser400: 'Ошибка валидации модели пользователя',
  mesErrConflictUser409: 'Пользователь с таким снилсом уже существует',
  mesErrConflictUserGroup409: 'Группа с таким именем уже назначена пользователю',
  mesErrIdUser400: 'Некорректный id пользователя',
  mesErrDeleteUser406: 'Ошибка! Удаление пользователя включенного в группы',

  //отправка письма с вопросом
  mesQuestion: 'Письмо отправлено',

  //валидация роута пользователя
  mesErrIdUser400: 'Некорректный id пользователя',
  mesAddProgrammUserCompleted: 'Программы успешно добавлены',
  mesErrValidationUser400: 'Ошибка валидации модели пользователя',
  mesAddProgrammUserCancelled: 'При добавлении программ произошла ошибка',


  //валидация роута пользователя (программы)
  mesErrIdProgramm400: 'Некорректный id программы',

  //валидация роута программ
  mesErrIdProgramm400: 'Некорректный id программы',
  mesErrValidationProgramm400: 'Ошибка валидации модели программ',
  mesErrNoProgramm404: 'Программа не найдена',
  mesErrCreateProgramm406: 'Ошибка! Длина массива тем не соответствует количеству блоков',
  mesErrDeleteProgramm406: 'Ошибка! Удаление используемой программы',
  mesErrConflictProgramm409: 'Программа с таким именем уже существует',

  //валидация роута групп
  mesErrUserEducationPast400: 'Удаление группы проходящей(закончившей) обучение',
  mesErrIdGroup400: 'Некорректный id группы',
  mesErrValidationGroup400: 'Ошибка валидации модели групп',
  mesErrNoGroup404: 'Группы не найдены',
  mesErrDeleteGroup406: 'Ошибка! Удаление используемой группы',
  mesErrConflictGroup409: 'Группа с таким именем уже существует',


  // mesErrValidationUser400: 'Ошибка валидации модели пользователя',
  // mesAddProgrammUserCompleted: 'Программы успешно добавлены',
  // mesAddProgrammUserCancelled: 'При добавлении программ произошла ошибка',
};
