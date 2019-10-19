'use strict'

const User = require('../../Models/User');

class UserController {
  async store ({ request }) {
    const data = request.all();

    const user = User.create(data);

    return user;
  }
}

module.exports = UserController
