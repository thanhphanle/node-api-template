const passwordValidator = require('../../src/validators/passwordValidator');

const password = 'thanhpl123';
console.log(passwordValidator.test(password));